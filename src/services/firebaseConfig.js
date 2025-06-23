import { initializeApp } from 'firebase/app';
import {
  initializeAuth,
  getReactNativePersistence
} from 'firebase/auth';
import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

import {
  EXPO_PUBLIC_API_KEY,
  EXPO_PUBLIC_AUTH_DOMAIN,
  EXPO_PUBLIC_PROJECT_ID,
  EXPO_PUBLIC_STORAGE_BUCKET,
  EXPO_PUBLIC_MESSAGING_SENDER_ID,
  EXPO_PUBLIC_APP_ID,
  EXPO_PUBLIC_MEASUREMENT_ID // <- No se usará si no activas analytics
} from '@env';

// 🔹 Configuración de Firebase
const firebaseConfig = {
  apiKey: EXPO_PUBLIC_API_KEY,
  authDomain: EXPO_PUBLIC_AUTH_DOMAIN,
  projectId: EXPO_PUBLIC_PROJECT_ID,
  storageBucket: EXPO_PUBLIC_STORAGE_BUCKET,
  messagingSenderId: EXPO_PUBLIC_MESSAGING_SENDER_ID,
  appId: EXPO_PUBLIC_APP_ID,
  measurementId: EXPO_PUBLIC_MEASUREMENT_ID, // Puedes quitarlo si no usas Analytics
};

// 🔹 Inicializa Firebase
const app = initializeApp(firebaseConfig);

// 🔹 Inicializa Auth con persistencia (importante en React Native)
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

// 🔹 Exporta lo necesario
export { app, auth, db, storage, obtenerRolUsuarioPorUID };
