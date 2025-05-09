# 🚕 Uber Trip Analysis

Hi! 👋  
This is a project that shows how people in Bangalore used Uber.  
It turns boring data (like pickup, fare, vehicle type) into a cool, clickable website.

---

## 🧠 What Does It Actually Do?

This app lets you:
- See real Uber rides from a spreadsheet
- Search by places (like Indiranagar or Koramangala)
- Filter by car type, payment type, user rating
- View a colorful chart of trip fares
- Use it on a computer or your phone
- Feel like a data scientist for a minute 😎

---

## 🧩 What Is This Project Made Of?

It’s split into 2 parts:

| Part      | What It Does                              | Name         |
|-----------|--------------------------------------------|--------------|
| Frontend  | Shows the pretty dashboard (the website)   | `frontend/`  |
| Backend   | Sends the trip data from database          | `backend/`   |
| Database  | Stores the trips safely                    | MongoDB Atlas|

You’ll run the backend first (like the engine), then the frontend (like the dashboard).

---

## 🛠 What You Need to Install First (One Time Setup)

Please install these first:

1. ✅ [Python 3](https://www.python.org/downloads/) – for backend
2. ✅ [Node.js](https://nodejs.org/) – for frontend
3. ✅ [Git](https://git-scm.com/downloads) – to download code
4. ✅ [VS Code](https://code.visualstudio.com/) – to work with code
5. ✅ [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) – where we store trip data (free)

Install each one, then restart your computer just to be safe.

---

## 📁 Folder Map

Here's what each folder/file is:

uber-trip-analysis/
├── backend/ # Runs the API (Python + FastAPI)
│ ├── app/ # All the backend code lives here
│ │ ├── main.py # Starts the server
│ │ ├── routes.py # Handles GET requests at /trips
│ │ ├── database.py # Connects to MongoDB
│ │ ├── utils.py # Helper functions
│ ├── load_csv.py # Uploads the CSV to MongoDB
│ ├── requirements.txt # List of Python packages to install
│ ├── .env # Hidden file where MongoDB password lives
│
├── frontend/ # Runs the UI (React + Tailwind)
│ ├── src/
│ │ ├── App.js # Main app — table, chart, filters, etc.
│ │ ├── api.js # Talks to the backend
│ ├── tailwind.config.js # Tailwind UI config
│ ├── package.json # React project settings
│
├── README.md # This file you're reading
├── uber_trips.csv # The trip data used in the dashboard

yaml
Copy
Edit

---

## 🔐 How to Create `.env` File (Backend Config)

This file tells your backend how to talk to the database.

### 🧾 Steps:
1. Go inside `backend/`
2. Create a file called `.env` (yes, with the dot)
3. Paste this inside:

MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/uber?retryWrites=true&w=majority

yaml
Copy
Edit

🧠 Replace `<username>` and `<password>` with your real MongoDB Atlas username and password.

If you don't have it, make a free MongoDB Atlas account → create a cluster → get the connection string.

---

## ✅ How to Run This Project (The Easy Way)

### STEP 1: Backend (data engine)

```bash
cd backend
pip install -r requirements.txt
python load_csv.py          # only run this once
uvicorn app.main:app --reload
Visit: http://localhost:8000/trips
If you see a lot of data, you're a genius 🎉

STEP 2: Frontend (dashboard)
bash
Copy
Edit
cd frontend
npm install
npm start
Visit: http://localhost:3000
Boom — you’re on the dashboard! 🎉

🎨 What You Can Do on the Dashboard
⌨️ Search by pickup/drop

🎚️ Adjust fare slider

🚗 Filter by vehicle (Auto, Mini, Sedan, SUV)

💰 Filter by payment (Cash, Card, UPI)

⭐ Filter by rating

🔁 Reset everything with one button

📊 See chart of fares

🧑‍🏫 What Each File Does (Code Breakdown)
🔹 frontend/src/App.js
The heart of the frontend.

Connects to /trips API

Saves trips in useState

Shows filters, tables, pagination

Updates chart when filters change

js
Copy
Edit
const [trips, setTrips] = useState([]);
const simulateBackend = async () => {
  const res = await api.get('/trips');
  setTrips(res.data);
};
🔹 backend/app/routes.py
Defines the /trips API.

python
Copy
Edit
@router.get("/trips")
def get_trips():
    return list(trips_collection.find({ ... }))
🧼 Common Mistakes & Fixes
What Went Wrong	What You Can Try
React shows blank page	Make sure backend is running on port 8000
Mongo error	Check .env file for correct MONGO_URI
Chart not loading	You may have filtered out all results 😅
pip or npm not found	Python or Node.js wasn’t installed properly
Touch command doesn’t work	Use New-Item in PowerShell

🚀 Want to Make It Public?
Frontend → Vercel or Netlify
Link your GitHub repo

Build command: npm run build

Output: build/

Backend → Render
Link repo

Start command: uvicorn app.main:app --host 0.0.0.0 --port 10000

Add MONGO_URI as env variable

🙋‍♀️ Still Confused?
You shouldn't be — but if you are:

Read this file again. Slowly. Carefully.

Ask your brilliant friend who made this.

Open an issue in GitHub.

💡 Pro Tip
This app may look simple, but it's actually a great base to learn real-world full-stack skills.

✅ APIs
✅ Databases
✅ React filters
✅ Chart visualizations
✅ Clean UI

👨‍🎓 Author
Made with ❤️ by @nska177 — so I never have to explain it again.

🧾 License
MIT — learn from it, remix it, use it. Just don’t sell it to Uber 😎

yaml
Copy
Edit
