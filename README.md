# 🌍 Mytrip - AI Travel Roadmap Planner

AI-powered travel planning web app that generates personalized itineraries using real-time maps, weather, route optimization, hotel suggestions, and intelligent recommendation systems.

Welcome to the AI Travel Roadmap Planner! This is a modern, full-stack web application designed to help users automatically generate beautiful, optimized travel itineraries using Google Gemini AI and OpenStreetMap.

## ✨ Features
1. **Intelligent Itinerary Generation:** Uses Gemini AI to build day-by-day plans based on origin, destination, preferred days, budget, travel type, and interests.
2. **Interactive Maps:** Fully integrated with Leaflet.js and OpenStreetMap (no API costs!) for pinning locations and visualizing routing (via Komoot Photon and OSRM).
3. **Budget Estimation:** Automatically estimates trips including flights/fuel, hotels, food, and activities.
4. **Live Context Backend:** Fetches real hotels and attractions using the Overpass API to inform the AI generation.
5. **Modern Dashboard:** Track your past trips and favorite places in a highly responsive sidebar UI.

---

## 🚀 Getting Started

### 1. Prerequisites
Ensure you have the following installed on your machine:
- **Node.js** (v18 or higher recommended)
- **MongoDB** (running locally on port `27017`)

### 2. Installation
Open your terminal, navigate to the project directory, and install the dependencies:
```bash
cd /Users/apple/Documents/trip
npm install
```

### 3. Environment Variables
In the root directory of the project, there is an `.env` file. Open it and ensure it has the following configuration:
```env
PORT=5001
MONGODB_URI=mongodb://127.0.0.1:27017/ai-travel-planner
JWT_SECRET=superSecretKeyForAITravelPlanner1234
GEMINI_API_KEY=your_actual_api_key_here
```
> **Important:** To get actual AI-generated itineraries instead of mocked fallback data, you MUST paste a valid `GEMINI_API_KEY`.

### 4. Running the Application
Start the development server using:
```bash
npm run dev
```

If everything is configured correctly, you should see the following in your terminal:
```
MongoDB connected
Server running on port 5001
```

### 5. Access the Frontend
Open your favorite web browser and navigate to:
**👉 http://localhost:5001**

From there, you can sign up for an account, log in, and start planning your next trip!

---

## 📂 Project Structure

```text
/trip
├── .env                  # Environment Variables
├── package.json          # Node dependencies and scripts
├── README.md             # This document!
├── public/               # Frontend Files (HTML, CSS, JS)
│   ├── index.html        # Landing Page
│   ├── login.html        # Login Page
│   ├── register.html     # Registration Page
│   ├── dashboard.html    # User Dashboard
│   ├── planner.html      # Create Trip Form
│   ├── plan.html         # Map and Itinerary Viewer
│   ├── styles.css        # Global CSS
│   └── js/
│       ├── api.js        # Frontend API helper
│       ├── auth.js       # Authentication handlers
│       └── components.js # Reusable UI components (Navbar, Chatbot)
└── server/               # Backend Express Server
    ├── index.js          # Entry Point
    ├── middleware/       # Express middlewares (JWT Auth)
    ├── models/           # Mongoose schemas (User, Trip)
    ├── routes/           # API Endpoints (Auth, Trips, Chat)
    └── services/         # Integrations (Gemini AI, OSM, Weather)
```

## 🛠 Tech Stack
- **Frontend:** HTML5, TailwindCSS, Vanilla JavaScript, Leaflet.js
- **Backend:** Node.js, Express.js
- **Database:** MongoDB / Mongoose
- **APIs:** Google Gemini AI, Komoot Photon, OSRM, Overpass API
