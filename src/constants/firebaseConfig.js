import { initializeApp } from "firebase/app";
import {
  initializeAuth,
  getReactNativePersistence
} from "firebase/auth";
import { getFirestore, collection, query, where, getDocs } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";

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

// 🔹 Función para obtener el rol del usuario desde Firestore usando UID
const obtenerRolUsuarioPorUID = async (uid) => {
  try {
    const q = query(collection(db, "usuarios"), where("uid", "==", uid));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      const userData = querySnapshot.docs[0].data();
      return userData.rol;
    } else {
      console.warn("⚠️ No se encontró ningún usuario con ese UID");
      return null;
    }
  } catch (error) {
    console.error("❌ Error obteniendo el rol:", error);
    return null;
  }
};

export { app, auth, db, storage, obtenerRolUsuarioPorUID };
