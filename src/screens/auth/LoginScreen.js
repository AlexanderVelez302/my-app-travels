// 📁 src/screens/LoginScreen.js

import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Icon from "react-native-vector-icons/Ionicons";
import { onAuthStateChanged } from "firebase/auth";
import { auth, obtenerRolUsuarioPorUID } from "../../constants/firebaseConfig"; // ✅ función actualizada
import { useAuth } from "../auth/AuthContext";
import styles from "../../styles/LoginStyles"; // ✅ Estilos separados

const LoginScreen = ({ navigation }) => {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log("✅ Usuario logueado:", user.email);
      } else {
        console.log("🚫 No hay usuario logueado");
      }
    });

    return () => unsubscribe();
  }, []);

  const handleLogin = async () => {
    try {
      await login(email, password);

      const uid = auth.currentUser.uid; // 🔹 Usamos UID del usuario actual
      const rol = await obtenerRolUsuarioPorUID(uid); // 🔹 Obtenemos rol desde Firestore

      if (rol === "admin") {
        navigation.navigate("AdminPanel");
      } else {
        navigation.navigate("Home");
      }
    } catch (err) {
      console.log("🔴 Error de login:", err);
      setError("Correo o contraseña incorrectos");
    }
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../../assets/Tokyo.png")}
        style={styles.backgroundImage}
      >
        <LinearGradient
          colors={["rgba(0,0,0,0.6)", "transparent"]}
          start={{ x: 0.5, y: 1 }}
          end={{ x: 0.5, y: 0 }}
          style={styles.overlay}
        />
      </ImageBackground>

      <View style={styles.card}>
        <Text style={styles.title}>Bienvenido</Text>

        {error ? <Text style={styles.error}>{error}</Text> : null}

        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#aaa"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#aaa"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        <View style={styles.row}>
          <TouchableOpacity style={styles.checkboxContainer}>
            <Icon name="checkmark-circle" size={20} color="#007bff" />
            <Text style={styles.checkboxText}>Recordarme</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={styles.forgotPassword}>¿Olvidaste tu contraseña?</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <LinearGradient
            colors={["#007bff", "#0056b3"]}
            style={styles.gradientButton}
          >
            <Text style={styles.loginButtonText}>Iniciar sesión</Text>
          </LinearGradient>
        </TouchableOpacity>

        <Text style={styles.orText}>O ingresa con</Text>
        <View style={styles.socialContainer}>
          {["logo-facebook", "logo-twitter", "logo-google", "logo-apple"].map(
            (icon, index) => (
              <TouchableOpacity key={index} style={styles.socialButton}>
                <Icon name={icon} size={24} color="#fff" />
              </TouchableOpacity>
            )
          )}
        </View>

        <TouchableOpacity onPress={() => navigation.replace("Register")}>
          <Text style={styles.registerText}>¿No tienes cuenta? Regístrate</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LoginScreen;
