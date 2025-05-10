from fastapi import APIRouter
from .database import trips_collection

router = APIRouter()
@router.get("/")
def root():
    return {"message": "Backend is running!"}

@router.get("/trips")
def get_trips():
    cursor = trips_collection.find(
        {
            "fare_inr": {"$ne": None},
            "user_rating": {"$ne": None}
        },
        {
            "_id": 0,
            "trip_id": 1,
            "user_id": 1,
            "date": 1,
            "pickup_point": 1,
            "dropoff_point": 1,
            "vehicle_type": 1,
            "distance_km": 1,
            "duration_min": 1,
            "fare_inr": 1,
            "payment_method": 1,
            "user_rating": 1
        }
    )

    trips = []
    for doc in cursor:
        try:
            if not (float('nan') in [doc['fare_inr'], doc['user_rating']]):
                trips.append(doc)
        except:
            continue

    return trips
