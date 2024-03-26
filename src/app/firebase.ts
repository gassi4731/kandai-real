// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDgceSkQTwvv8UDuyJt6AfKLsKpUW0nrZ4",
  authDomain: "kandai-real.firebaseapp.com",
  projectId: "kandai-real",
  storageBucket: "kandai-real.appspot.com",
  messagingSenderId: "100609353685",
  appId: "1:100609353685:web:f0dd6d3c4a2c2b631bbf5c",
  measurementId: "G-5JJWVH0B8N",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const storage = getStorage(app, "gs://kandai-real.appspot.com");
export const db = getFirestore(app);

export default app;