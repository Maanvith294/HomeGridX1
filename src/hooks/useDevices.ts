import { useEffect, useState } from "react";
import { ref, onValue } from "firebase/database";
import { database } from "../firebase/firebase";

export function useDevices() {
  const [devices, setDevices] = useState<any>(null);

  useEffect(() => {
    const devicesRef = ref(
      database,
      "houses/HomeGridX/houseID_001/roomID_01/devices"
    );

    const unsub = onValue(devicesRef, (snap) => {
      setDevices(snap.val());
    });

    return () => unsub();
  }, []);

  return devices;
}
