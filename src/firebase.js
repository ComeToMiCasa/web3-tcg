// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app"
import { getAnalytics } from "firebase/analytics"
import { getFirestore } from "firebase/firestore"
import { getStorage } from "firebase/storage"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: "AIzaSyBQ9OGwFt6c1lLEsfGWNXByNzd0h-7_Ysk",
	authDomain: "web3-tcg.firebaseapp.com",
	projectId: "web3-tcg",
	storageBucket: "web3-tcg.appspot.com",
	messagingSenderId: "518084044127",
	appId: "1:518084044127:web:e2c5f5e0c757dfb0f942ea",
	measurementId: "G-JBZH0NN2T7"
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const db = getFirestore(app)
const storage = getStorage(app)
const analytics = getAnalytics(app)

export { app, db }