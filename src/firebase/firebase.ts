// // src/firebase.js
// import { initializeApp } from "firebase/app";
// import { getAuth } from "firebase/auth";
// import { getDatabase } from "firebase/database";

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

// // Export Firebase services
// export const auth = getAuth(app);
// export const db = getDatabase(app);

// src/firebaseConfig.ts
import { initializeApp } from "firebase/app";
import { getAuth, Auth } from "firebase/auth";
import { getDatabase, Database } from "firebase/database";

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCNCLRlgiZ7EMHTn0f0mhT15g-oIXbgsG0",
  authDomain: "homegridx.firebaseapp.com",
  databaseURL: "https://homegridx-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "homegridx",
  storageBucket: "homegridx.firebasestorage.app",
  messagingSenderId: "454923037937",
  appId: "1:454923037937:web:249cb141fdf843dac4cd50",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export Firebase services WITH TYPES
export const auth: Auth = getAuth(app);
export const database: Database = getDatabase(app);
