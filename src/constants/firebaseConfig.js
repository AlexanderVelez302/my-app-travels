import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage"; // 🔹 Importa AsyncStorage

const firebaseConfig = {
  apiKey: "AIzaSyBhRpG_MdEYaj6j1-QeeXCI6d7GNng2CNU",
  authDomain: "my-app-travels.firebaseapp.com",
  projectId: "my-app-travels",
  storageBucket: "my-app-travels.appspot.com",
  messagingSenderId: "723830445658",
  appId: "1:723830445658:android:943a6d36c4684c30ca6a63",
};

// 🔹 Inicializa Firebase
const app = initializeApp(firebaseConfig);

// 🔹 Inicializa Auth con persistencia
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});

const db = getFirestore(app);
const storage = getStorage(app);

export { app, auth, db, storage };