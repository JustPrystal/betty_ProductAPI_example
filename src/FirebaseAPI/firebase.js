import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB0EOxJduz6MhCX4KMXyNzQmzQx0bySgc0",
  authDomain: "betty-510e8.firebaseapp.com",
  databaseURL: "https://betty-510e8-default-rtdb.firebaseio.com",
  projectId: "betty-510e8",
  storageBucket: "betty-510e8.appspot.com",
  messagingSenderId: "188341672056",
  appId: "1:188341672056:web:321349f79c7c8a6c03758d"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage();

export { db, storage, app };
