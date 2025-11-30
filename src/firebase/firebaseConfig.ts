// // src/firebaseConfig.js
// import { initializeApp } from "firebase/app";
// import { getAuth } from "firebase/auth";
// import { getDatabase } from "firebase/database";

// // Paste your own Firebase config below ↓
// const firebaseConfig = {
//   apiKey: "AIzaSyCNCLRlgiZ7EMHTn0f0mhT15g-oIXbgsG0",
//   authDomain: "homegridx.firebaseapp.com",
//   databaseURL: "https://homegridx-default-rtdb.asia-southeast1.firebasedatabase.app",
//   projectId: "homegridx",
//   storageBucket: "homegridx.firebasestorage.app",
//   messagingSenderId: "454923037937",
//   appId: "1:454923037937:web:249cb141fdf843dac4cd50",
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);

// // Export the services you'll use
// export const auth = getAuth(app);
// export const database = getDatabase(app);

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyCNCLRlgiZ7EMHTn0f0mhT15g-oIXbgsG0",
  authDomain: "homegridx.firebaseapp.com",
  databaseURL: "https://homegridx-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "homegridx",
  storageBucket: "homegridx.firebasestorage.app",
  messagingSenderId: "454923037937",
  appId: "1:454923037937:web:249cb141fdf843dac4cd50",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getDatabase(app);
