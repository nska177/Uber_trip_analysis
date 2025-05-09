from app.database import collection

try:
    print("Testing MongoDB connection...")
    result = collection.find_one()
    if result:
        print("MongoDB connected and data found!")
    else:
        print("MongoDB connected but collection is empty.")
except Exception as e:
    print(f"MongoDB connection failed: {e}")
