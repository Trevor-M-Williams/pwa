import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCHR6Zw0WAlByX87uVhcZ_z7AiprkfXLUc",
  authDomain: "gcpwa-a3483.firebaseapp.com",
  projectId: "gcpwa-a3483",
  storageBucket: "gcpwa-a3483.appspot.com",
  messagingSenderId: "161422893106",
  appId: "1:161422893106:web:48445513ec12ecd8529c2b",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
