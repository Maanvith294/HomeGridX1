import firebase_admin
from firebase_admin import credentials, db
import time
import random
from datetime import datetime

# Initialize Firebase with your service account key
cred = credentials.Certificate("easyhome-eba93-firebase-adminsdk-fbsvc-651734792b.json")
firebase_admin.initialize_app(cred, {
    "databaseURL": "https://easyhome-eba93-default-rtdb.firebaseio.com/"
})


# Reference to Firebase rooms
rooms_ref = db.reference("/rooms")
intruder_ref = db.reference("/intruder_alert")

def simulate_data():
    while True:
        for room in ["room1", "room2"]:  # Simulating data for multiple rooms
            power_usage = random.randint(10, 100)  # Random power usage
            current_usage = round(random.uniform(1, 5), 2)  # Random current in Amps
            motion_detected = random.choice([True, False])  # Simulate motion
            lights_on = random.choice([True, False])  # Simulate light status
            timestamp = int(time.time())  # Current Unix timestamp

            # Update room data
            rooms_ref.child(room).update({
                "power_usage": power_usage,
                "current_usage": current_usage,
                "motion_detected": motion_detected,
                "lights_on": lights_on,
                "last_motion_time": timestamp
            })
            
            print(f"[{datetime.now()}] Updated {room}: Power={power_usage}W, Motion={motion_detected}, Lights On={lights_on}")

            # Intruder alert: If motion is detected at night (10 PM - 6 AM)
            current_hour = datetime.now().hour
            if motion_detected and (current_hour >= 22 or current_hour <= 6):
                intruder_ref.set(True)
                print("🚨 Intruder alert triggered!")

        time.sleep(5)  # Wait 5 seconds before updating again

# Run the simulation
simulate_data()
