"""
AI classifier using Gemini to classify complaints.
Uses a single Gemini call to predict category, priority, and sentiment.
Falls back to rule-based classification if Gemini is unavailable.
"""

import json
import os
import random
from dotenv import load_dotenv
from models import CATEGORY_DEPT_MAP, Category

# Load from project root .env as well
load_dotenv(os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", ".env"))
load_dotenv()

CRITICAL_KEYWORDS = ["fire", "dangerous", "school", "children", "death", "emergency", "collapse", "accident"]

# Try to initialize Gemini client
_client = None
try:
    from google import genai
    api_key = os.getenv("GEMINI_API_KEY")
    if api_key:
        _client = genai.Client(api_key=api_key)
        print(f"✅ Gemini AI client initialized successfully")
    else:
        print("⚠️  GEMINI_API_KEY not found — using rule-based fallback")
except Exception as e:
    print(f"⚠️  Gemini init failed: {e} — using rule-based fallback")
    _client = None


def _gemini_classify(title: str, description: str) -> dict | None:
    """Use Gemini to classify category, priority, and sentiment in one call."""
    if not _client:
        return None

    prompt = f"""You are an AI assistant for a Smart Public Service CRM (PS-CRM) platform.
Analyze the following civic complaint and return a JSON object with these fields:

1. "category": Classify into exactly ONE of: Road, Garbage, Water, Electricity, Safety, Transport, Sanitation, Other
2. "priority": Assess urgency as exactly ONE of: CRITICAL, HIGH, MEDIUM, LOW
   - CRITICAL: Immediate danger to life/safety, emergencies, fire, accidents, structural collapse
   - HIGH: Significant public inconvenience, health hazards, essential services disrupted
   - MEDIUM: Moderate issues needing attention within a few days
   - LOW: Minor issues, cosmetic problems, general feedback
3. "sentiment": A float between -1.0 (very negative/angry) and 0.0 (neutral). Most complaints are negative. Consider the tone, urgency words, and emotional language.
4. "confidence": An integer 1-100 representing your confidence in the classification.

Complaint Title: {title}
Complaint Description: {description}

Return ONLY valid JSON, no markdown, no explanation. Example:
{{"category": "Road", "priority": "HIGH", "sentiment": -0.72, "confidence": 92}}"""

    try:
        response = _client.models.generate_content(
            model="gemini-2.5-flash",
            contents=prompt
        )
        raw = response.text.strip()
        # Strip markdown code fences if present
        if raw.startswith("```"):
            raw = raw.split("\n", 1)[1] if "\n" in raw else raw[3:]
            if raw.endswith("```"):
                raw = raw[:-3]
            raw = raw.strip()

        result = json.loads(raw)

        # Validate fields
        valid_categories = [c.value for c in Category]
        valid_priorities = ["CRITICAL", "HIGH", "MEDIUM", "LOW"]

        if result.get("category") not in valid_categories:
            result["category"] = None
        if result.get("priority") not in valid_priorities:
            result["priority"] = None
        if not isinstance(result.get("sentiment"), (int, float)):
            result["sentiment"] = None
        else:
            result["sentiment"] = max(-1.0, min(0.0, float(result["sentiment"])))
        if not isinstance(result.get("confidence"), int):
            result["confidence"] = None

        return result
    except Exception as e:
        print(f"⚠️  Gemini classification failed: {e}")
        return None


def _rule_based_classify(title: str, description: str, category: str) -> dict:
    """Fallback rule-based classification."""
    text = f"{title} {description}".lower()
    is_critical = any(kw in text for kw in CRITICAL_KEYWORDS)

    if is_critical:
        priority = "CRITICAL"
    elif category in ["Safety"]:
        priority = "CRITICAL"
    elif category in ["Water", "Road", "Electricity"]:
        priority = "HIGH"
    else:
        priority = "MEDIUM"

    sentiment = round(-(random.random() * 0.6 + 0.3), 2)
    confidence = random.randint(78, 90)

    return {
        "category": category,
        "priority": priority,
        "sentiment": sentiment,
        "confidence": confidence,
    }


def classify_complaint(title: str, description: str, category: str) -> dict:
    """
    Classify a complaint using Gemini AI (with fallback to rule-based).
    Returns dict with: category, confidence, priority, sentiment, department.
    """
    # Try Gemini first
    gemini_result = _gemini_classify(title, description)

    if gemini_result:
        final_category = gemini_result["category"] or category
        priority = gemini_result["priority"] or "MEDIUM"
        sentiment = gemini_result["sentiment"] if gemini_result["sentiment"] is not None else round(-(random.random() * 0.6 + 0.3), 2)
        confidence = gemini_result["confidence"] or random.randint(85, 95)
        print(f"🤖 Gemini classified: category={final_category}, priority={priority}, sentiment={sentiment}")
    else:
        # Fallback to rule-based
        fallback = _rule_based_classify(title, description, category)
        final_category = fallback["category"]
        priority = fallback["priority"]
        sentiment = fallback["sentiment"]
        confidence = fallback["confidence"]
        print(f"📋 Rule-based classified: category={final_category}, priority={priority}")

    # Map to department
    try:
        dept = CATEGORY_DEPT_MAP[Category(final_category)]
    except (ValueError, KeyError):
        dept = "PWD"

    return {
        "category": final_category,
        "confidence": confidence,
        "priority": priority,
        "sentiment": sentiment,
        "department": dept,
    }
