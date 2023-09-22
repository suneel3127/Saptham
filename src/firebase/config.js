import { initializeApp } from "firebase/app";
import { getAuth,getReactNativePersistence, initializeAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
import AsyncStorage from "@react-native-async-storage/async-storage";
const firebaseConfig = {
    apiKey: "AIzaSyB9vUuhE2lTP-Ha2yZvuOYvfhu6hV9yH0Q",
    authDomain: "saptham-140ee.firebaseapp.com",
    projectId: "saptham-140ee",
    storageBucket: "saptham-140ee.appspot.com",
    messagingSenderId: "966173705939",
    appId: "1:966173705939:web:2be598b89dcb47c10ff626",
    databaseURL: "https://saptham-140ee-default-rtdb.asia-southeast1.firebasedatabase.app/",
  };
  const app = initializeApp(firebaseConfig);

  export const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage),
  });
  export const database = getDatabase(app);
