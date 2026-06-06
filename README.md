
# 🌍 Mytrip — I built an AI Travel Roadmap Planner (open source, free to self-host)

Hey everyone! I've been working on **Mytrip** for the past few months — a full-stack web app that uses **Google Gemini AI** to automatically generate personalized travel itineraries. It's free, open source, and uses OpenStreetMap so there are **zero paid map API costs**.

---

## ✨ What it does

- 🤖 **AI Itinerary Generation** — Tell it your origin, destination, budget, travel style, and interests. Gemini AI builds a complete day-by-day plan for you.
- 🗺️ **Interactive Maps** — Built with Leaflet.js + OpenStreetMap. Pins your locations and draws optimized routes via OSRM. No Google Maps API needed.
- 💰 **Budget Estimation** — Automatically breaks down estimated costs: flights or fuel, hotels, food, and activities.
- 📡 **Live Hotel & Attraction Data** — Uses the Overpass API to pull real nearby hotels and attractions to ground the AI in actual data.
- 📊 **Trip Dashboard** — Track all your past trips and saved favorites in a clean sidebar UI.
- 🔐 **Auth System** — Sign up / log in with JWT-protected routes. Your trips stay private.

---

## 🛠 Tech Stack

| Layer | Tech |
|-------|------|
| Frontend | HTML5, TailwindCSS, Vanilla JS, Leaflet.js |
| Backend | Node.js, Express.js |
| Database | MongoDB / Mongoose |
| AI | Google Gemini AI |
| Maps | OpenStreetMap, OSRM, Komoot Photon, Overpass API |
| Auth | JWT |

---

## 🚀 Self-hosting in 5 steps

**Prerequisites:** Node.js v18+ and MongoDB running locally on port `27017`

**1. Clone and install**

    git clone https://github.com/your-username/mytrip.git
    cd mytrip
    npm install

**2. Set up your `.env` file** in the project root:

    PORT=5001
    MONGODB_URI=mongodb:///mytri
    JWT_SECRET=replace-this-with-a-long-random-secret-string
    GEMINI_API_KEY=AIzaSyDUMMY_get_yours_free_at_aistudio_google_com

> ⚠️ Get a free `GEMINI_API_KEY` at [aistudio.google.com](https://aistudio.google.com). Without it the app falls back to mocked itinerary data.

**3. Start the dev server**

    npm run dev

**4. Watch for this output**

    ✓ MongoDB connected
    ✓ Server running on port 5001

**5. Open the app**

    http://localhost:5001

Sign up, log in, and start planning your next trip!

---

## 📂 Project Structure

    mytrip/
    ├── .env                  ← your secrets (never commit this!)
    ├── package.json
    ├── public/               ← frontend
    │   ├── index.html        ← landing page
    │   ├── login.html
    │   ├── register.html
    │   ├── dashboard.html    ← trip history
    │   ├── planner.html      ← create trip form
    │   ├── plan.html         ← map + itinerary viewer
    │   ├── styles.css
    │   └── js/
    │       ├── api.js        ← API helper
    │       ├── auth.js       ← auth handlers
    │       └── components.js ← navbar, chatbot
    └── server/               ← express backend
        ├── index.js
        ├── middleware/       ← JWT auth
        ├── models/           ← User, Trip schemas
        ├── routes/           ← auth, trips, chat
        └── services/         ← Gemini AI, OSM, Weather

---

## 🔐 Security notes

- Passwords are hashed before storage
- All trip routes are JWT-protected
- `.env` is in `.gitignore` — secrets never leave your machine
- Input is sanitized via Mongoose before hitting the DB

---

## 🤝 Contributing

PRs are welcome! Fork the repo, create a branch (`feat/your-idea`), and open a pull request. Any improvements to the AI prompts, map UX, or budget calculations are especially appreciated.

\
