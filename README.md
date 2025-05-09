# 🚕 Uber Trip Analysis Dashboard

This is a full-stack web dashboard to analyze Uber trips in Bangalore, built using:

- ⚛️ React + Tailwind CSS
- 🧠 FastAPI + MongoDB Atlas
- 📊 Chart.js

## 🔧 Setup Instructions

### Backend:
1. `cd backend`
2. `pip install -r requirements.txt`
3. Create `.env` with your Mongo URI
4. Run with `uvicorn app.main:app --reload`

### Frontend:
1. `cd frontend`
2. `npm install`
3. `npm start`

## 📦 Features

- Filters: vehicle type, fare, rating, payment
- Search by pickup/drop
- Pagination
- Fare trend chart

## 🌐 Deployment Suggestions

- Frontend: Vercel / Netlify
- Backend: Render / Railway
