from pydantic import BaseModel

class Trip(BaseModel):
    date: str
    pickup_point: str
    dropoff_point: str
    fare: float
