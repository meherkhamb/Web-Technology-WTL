import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyC4hfIU7K0UfeildSmrseacxGGEGhnFYOY",
    authDomain: "campus-events-3a029.firebaseapp.com",
    projectId: "campus-events-3a029",
    storageBucket: "campus-events-3a029.firebasestorage.app",
    messagingSenderId: "205466377624",
    appId: "1:205466377624:web:ab65d77dff1520c1549fed",
    measurementId: "G-XHKKR0MKT8"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const db = getFirestore(app);
export const auth = getAuth(app);