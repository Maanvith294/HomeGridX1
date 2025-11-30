import { ref, update } from "firebase/database";
import { database } from "../firebase/firebase";

export function updateDevice(device: string, data: any) {
  return update(
    ref(database, `houses/HomeGridX/houseID_001/roomID_01/devices/${device}`),
    data
  );
}
