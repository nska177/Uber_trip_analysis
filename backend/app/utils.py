def clean(doc):
    print("CLEANING DOC:", doc)
    return {
        "date": doc.get("date"),
        "pickup_point": doc.get("pickup_point"),
        "dropoff_point": doc.get("dropoff_point"),
        "fare": float(doc.get("fare", 0))
    }
