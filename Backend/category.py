import os
from dotenv import load_dotenv
from google import genai

# load .env variables
load_dotenv()

API_KEY = os.getenv("GEMINI_API_KEY")

CATEGORIES = [
    "Financial Services (Banking Division)",
    "Labour and Employment",
    "Central Board of Direct Taxes (Income Tax)",
    "Housing and Urban Affairs",
    "Telecommunications",
    "Road Transport and Highways"
]


def classify_complaint(client, complaint):

    prompt = f"""
Classify the complaint into ONE category from this list:

{CATEGORIES}

Complaint: {complaint}

Return only the category name.
"""

    response = client.models.generate_content(
        model="gemini-2.5-flash",
        contents=prompt
    )

    return response.text.strip()


def main():

    client = genai.Client(api_key=API_KEY)

    print("Complaint Classifier (type 'exit' to quit)\n")

    while True:
        complaint = input("Enter complaint: ")

        if complaint.lower() == "exit":
            break

        category = classify_complaint(client, complaint)

        print("Predicted Category:", category)
        print("-" * 40)


if __name__ == "__main__":
    main()