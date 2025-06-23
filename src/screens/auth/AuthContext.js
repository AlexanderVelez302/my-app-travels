import React, { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth, db } from "../../services/firebaseConfig";
import { collection, query, where, getDocs } from "firebase/firestore";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setUser(user);

      if (user) {
        try {
          const q = query(collection(db, "usuarios"), where("email", "==", user.email));
          const querySnapshot = await getDocs(q);

          if (!querySnapshot.empty) {
            const userInfo = querySnapshot.docs[0].data();
            setUserData(userInfo);
          } else {
            console.warn("No se encontró información del usuario en Firestore.");
          }
        } catch (err) {
          console.error("Error al obtener los datos del usuario:", err);
        }
      } else {
        setUserData(null);
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // ✅ NUEVA FUNCIÓN: login
  const login = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      setUser(userCredential.user);
    } catch (error) {
      console.error("Error en login:", error);
      throw error; // para manejarlo desde la pantalla de login
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      setUser(null);
      setUserData(null);
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, userData, setUser, setUserData, login, logout }}>
      {!loading && children}
    </AuthContext.Provider>
  );  
};

export const useAuth = () => useContext(AuthContext);
