import pandas as pd
from pymongo import MongoClient
from dotenv import load_dotenv
import os

load_dotenv()

client = MongoClient(os.getenv("MONGO_URI"))
db = client["uber"]
collection = db["trips"]

df = pd.read_csv("uber_trips.csv")

# Rename columns to match your model
df.rename(columns={
    "trip_id": "trip_id",
    "user_id": "user_id",
    "pickup_point": "pickup_point",
    "dropoff_point": "dropoff_point",
    "vehicle_type": "vehicle_type",
    "distance_km": "distance_km",
    "duration_min": "duration_min",
    "fare_inr": "fare_inr",
    "payment_method": "payment_method",
    "trip_date": "date",
    "user_rating": "user_rating"
}, inplace=True)

# Replace NaN with None
df = df.where(pd.notnull(df), None)

# Drop rows where fare or rating is NaN or not convertible
df["fare_inr"] = pd.to_numeric(df["fare_inr"], errors="coerce")
df["user_rating"] = pd.to_numeric(df["user_rating"], errors="coerce")
df = df.dropna(subset=["fare_inr", "user_rating"])

collection.delete_many({})
collection.insert_many(df.to_dict(orient="records"))
print("✅ Data inserted into MongoDB successfully.")
