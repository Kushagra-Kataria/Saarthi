

# PS-CRM: Smart Public Service CRM — Implementation Plan

## Design System
- **Primary**: Deep navy (#1A3A5C), **Accent**: Orange (#F47B20)
- Government tech aesthetic inspired by UMANG/DigiLocker — clean cards, badge pills, icon-led navigation
- Fully mobile-responsive with consistent typography and component library

## Pages & Features

### 1. Landing Page (`/`)
- Top nav with PS-CRM branding and links (Home, Submit, Track, Dashboard, Login)
- Hero section with headline, subtext, and two CTAs
- Animated stats counter bar (4 KPIs)
- 6 feature cards (AI Classification, Priority Detection, Duplicate Detection, Heatmap, Crisis Alerts, WhatsApp)

### 2. Complaint Submission (`/submit`)
- 3-step form with visual step indicator
- **Step 1**: Name, Mobile, Email, simulated OTP button
- **Step 2**: Title, Description, Category dropdown (8 options), drag-drop photo upload
- **Step 3**: Interactive Leaflet map with GPS "Use my location" button, address field, pin drop
- **Success screen**: Generated complaint ID, simulated AI classification result (1.5s loading → category, confidence, priority, sentiment), duplicate detection alert if nearby complaint exists, WhatsApp/copy share buttons
- Auto-flags CRITICAL if keywords like "fire", "dangerous", "children" detected

### 3. Complaint Tracking (`/track`)
- Search by Complaint ID + mobile number
- Detail card showing ID, title, category/priority badges, department, dates
- Vertical timeline stepper (Submitted → Under Review → Assigned → In Progress → Resolved) with color states

### 4. Admin Dashboard (`/admin`)
- Sidebar navigation (Dashboard, All Complaints, Heatmap, Crisis Alerts, Departments, Reports, Settings)
- 4 KPI cards at top
- Charts row: Bar (by category), Line (daily volume 30 days), Donut (status breakdown) using Recharts
- Priority queue table with color-coded badges, SLA deadline highlighting, action buttons
- Department performance table with completion % bars and ratings

### 5. Heatmap View (`/admin/heatmap`)
- Full-page Leaflet map centered on Bengaluru with heatmap overlay (complaint density)
- Left filter panel: category checkboxes, date range, priority, department
- Right stats panel: top 5 hotspot zones, total complaints, category pie chart

### 6. Public Transparency Dashboard (`/transparency`)
- No login required, header: "Bengaluru City Grievance Scorecard — Live"
- Summary stats bar
- Department leaderboard table with resolution rate, avg time, citizen rating, and Excellent/Needs Improvement badges

## Mock Data
- 20+ realistic complaints across Bengaluru/Chennai/Pune streets, all 8 categories
- 4-5 CRITICAL priority, 3 duplicate pairs, 2 resolved with citizen feedback
- Coordinates, sentiment scores, timestamps, department assignments

## Technical Approach
- React + Tailwind + TypeScript (Lovable stack)
- `react-leaflet` + `leaflet` for maps and heatmap
- `leaflet.heat` plugin for heatmap visualization
- Recharts for all dashboard charts
- React Router for all 6 pages with shared layout
- All data is mock/client-side (no backend needed for prototype)

