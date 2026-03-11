# 🛡️ Saarthii — Smart Public Service Governance Platform

> AI-powered civic complaint management system built for Indian cities. Submit complaints, track resolutions in real-time, and hold departments accountable.

[![Demo Video](https://img.shields.io/badge/Demo-YouTube-red?logo=youtube)](https://youtu.be/x3wFj2a-pks)
[![Live Backend](https://img.shields.io/badge/Backend-Render-blue?logo=render)](https://saarthi-6mut.onrender.com)

---

## 🎬 Demo Video

[![Saarthii Demo](https://img.youtube.com/vi/x3wFj2a-pks/maxresdefault.jpg)](https://youtu.be/x3wFj2a-pks)

▶️ **[Watch Full Demo on YouTube](https://youtu.be/x3wFj2a-pks)**

## 🎥 Prototype Video

📎 **[Watch Prototype Walkthrough on Google Drive](https://drive.google.com/file/d/1l3q8huf4bhyWPGdkBgLGn_Hrzxts7hBe/view?usp=sharing)**

---

## ✨ Features

| Feature | Description |
|---------|-------------|
| 🤖 **AI Auto-Classification** | Gemini AI classifies complaints by category, priority (CRITICAL/HIGH/MEDIUM/LOW), and sentiment |
| 📝 **Smart Complaint Submission** | Multi-step form with phone validation, location picker, and photo upload |
| 🔍 **Complaint Tracking** | Real-time status tracking with timeline visualization |
| 📊 **Admin Dashboard** | Interactive charts, priority queue, department stats, and analytics |
| 🗺️ **Heatmap Analytics** | Geographic visualization of complaint density across city zones |
| 🔁 **Duplicate Detection** | Prevents duplicate complaints using description similarity (Jaccard index) |
| 🚨 **Priority Detection** | Critical keywords auto-flag complaints for immediate attention |
| 📱 **Fully Responsive** | Mobile-friendly design that works on all devices |

---

## 🛠️ Tech Stack

### Frontend
- **React 18** + TypeScript
- **Vite** — Build tool
- **Tailwind CSS** — Styling
- **Shadcn/UI** — Component library
- **Recharts** — Dashboard charts
- **Leaflet** — Maps & heatmap
- **Framer Motion** — Animations
- **Firebase** — Authentication

### Backend
- **FastAPI** — Python REST API
- **Google Gemini AI** — Complaint classification (category, priority, sentiment)
- **Pydantic** — Data validation
- **Uvicorn** — ASGI server

---

## 📁 Project Structure

```
Saarthii/
├── src/                    # Frontend (React)
│   ├── components/         # Reusable UI components
│   │   ├── layout/         # Navbar, AdminLayout
│   │   └── ui/             # Shadcn/UI components
│   ├── pages/              # Page components
│   │   ├── Index.tsx        # Landing page
│   │   ├── Submit.tsx       # Complaint submission
│   │   ├── Track.tsx        # Complaint tracking
│   │   ├── Admin.tsx        # Admin dashboard
│   │   └── Transparency.tsx # Public transparency portal
│   └── data/               # Mock data & types
├── Backend/                # Backend (FastAPI)
│   ├── main.py             # App entry point & CORS
│   ├── ai_classifier.py    # Gemini AI classification
│   ├── models.py           # Pydantic models & enums
│   ├── data_store.py       # In-memory data store
│   └── routers/            # API route handlers
│       ├── complaints.py   # CRUD + duplicate detection
│       ├── admin.py        # Dashboard stats & charts
│       ├── heatmap.py      # Heatmap data
│       └── departments.py  # Department management
├── .env                    # Frontend env variables
├── .npmrc                  # npm config (legacy peer deps)
└── package.json
```

---

## 🚀 Getting Started

### Prerequisites
- **Node.js** 18+
- **Python** 3.10+
- **Gemini API Key** — Get one from [Google AI Studio](https://aistudio.google.com/apikey)

### 1. Clone the repo
```bash
git clone https://github.com/Kushagra-Kataria/Saarthi.git
cd Saarthi
```

### 2. Setup Frontend
```bash
npm install --legacy-peer-deps
npm run dev
```

### 3. Setup Backend
```bash
cd Backend
python -m venv venv
venv\Scripts\activate        # Windows
# source venv/bin/activate   # Mac/Linux

pip install -r requirements.txt
```

### 4. Configure Environment
Create `Backend/.env`:
```env
GEMINI_API_KEY=your-gemini-api-key-here
```

### 5. Run Backend
```bash
uvicorn main:app --reload
```

### 6. Open the app
- **Frontend**: http://localhost:8080
- **Backend API**: http://localhost:8000/docs

---

## 🌐 Deployment

| Service | Platform | URL |
|---------|----------|-----|
| Backend | Render | [saarthi-6mut.onrender.com](https://saarthi-6mut.onrender.com) |

### Deploy Backend (Render)
- **Root Directory**: `Backend`
- **Build Command**: `pip install -r requirements.txt`
- **Start Command**: `uvicorn main:app --host 0.0.0.0 --port $PORT`
- **Environment Variable**: `GEMINI_API_KEY`

### Deploy Frontend (Vercel)
- **Framework**: Vite
- **Install Command**: `npm install --legacy-peer-deps`
- **Build Command**: `npm run build`
- **Output Directory**: `dist`

---

## 🧠 AI Classification

Saarthii uses **Google Gemini 2.5 Flash** to analyze complaints in a single API call and predict:

- **Category** — Road, Garbage, Water, Electricity, Safety, Transport, Sanitation, Other
- **Priority** — CRITICAL, HIGH, MEDIUM, LOW (based on urgency and danger level)
- **Sentiment** — Float from -1.0 (very negative) to 0.0 (neutral)

Falls back to rule-based classification if the API is unavailable.

---

## 📄 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/complaints` | List all complaints |
| `POST` | `/api/complaints` | Submit a new complaint |
| `GET` | `/api/complaints/{id}` | Get complaint by ID |
| `GET` | `/api/admin/stats` | Dashboard statistics |
| `GET` | `/api/admin/charts/category` | Category distribution |
| `GET` | `/api/admin/charts/status` | Status distribution |
| `GET` | `/api/admin/charts/daily` | Daily complaint trend |
| `GET` | `/api/heatmap` | Heatmap data points |
| `GET` | `/api/departments` | List departments |

---


## 📝 License

This project is for educational and prototype purposes.
