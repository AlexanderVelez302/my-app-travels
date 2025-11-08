import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, ImageBackground } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons as Icon } from "@expo/vector-icons";
import { onAuthStateChanged, GoogleAuthProvider, signInWithCredential } from "firebase/auth";
import * as Google from "expo-auth-session/providers/google";
import * as AuthSession from "expo-auth-session";
import { auth } from "../../services/firebaseConfig";
import { useAuth } from "../auth/AuthContext";
import styles from "../../styles/LoginStyles";
import { obtenerRolUsuarioPorUID } from "../../services/firebaseConfig";

const LoginScreen = ({ navigation }) => {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // --- Configuración de Google Auth ---
const redirectUri = AuthSession.makeRedirectUri({
  useProxy: true,
  scheme: "myapptravels",
});

const [request, response, promptAsync] = Google.useAuthRequest({
  webClientId: "723830445658-8k5hqvmfootf1hssb9eucnmtr6tg99pq.apps.googleusercontent.com",
  iosClientId: "723830445658-rsdpc0r5cuf1sd0q1i00n6l84hq466ik.apps.googleusercontent.com",
  androidClientId: "723830445658-rtacs63ulv3mkpeparfdu6q2c1j65c5u.apps.googleusercontent.com",
  redirectUri,
  scopes: ["profile", "email"],
});

console.log("🔗 Redirect URI final:", redirectUri);
  // --- Monitoreo de estado de autenticación ---

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log("✅ Usuario logueado:", user.email);
      } else {
        console.log("🚫 No hay usuario logueado");
      }
    });
    return unsubscribe;
  }, []);

  // Redirección que debes agregar en Google Cloud (solo la primera vez)
console.log("Redirect URI:", AuthSession.makeRedirectUri({
  useProxy: true,
  native: "myapptravels://redirect"
}));

console.log("Full redirect (for Google Cloud):", AuthSession.makeRedirectUri({
  useProxy: true
}));


  // --- Manejo de respuesta de Google ---
  useEffect(() => {
    const signInWithGoogle = async () => {
      try {
        if (response?.type === "success") {
          const { idToken } = response.authentication;
          if (!idToken) throw new Error("No se recibió idToken de Google.");

          const credential = GoogleAuthProvider.credential(idToken);
          await signInWithCredential(auth, credential);

          const uid = auth.currentUser.uid;
          const rol = await obtenerRolUsuarioPorUID(uid);
          console.log("🔐 Rol obtenido:", rol);

          navigation.replace("Home");
        }
      } catch (err) {
        console.error("Error Google Sign-In:", err);
        setError("No se pudo iniciar sesión con Google.");
      }
    };

    signInWithGoogle();
  }, [response]);

  const handleLogin = async () => {
    try {
      await login(email, password);
      const uid = auth.currentUser.uid;
      const rol = await obtenerRolUsuarioPorUID(uid);
      console.log("🔐 Rol obtenido:", rol);
      navigation.replace("Home");
    } catch (err) {
      console.log("🔴 Error de login:", err);
      setError("Correo o contraseña incorrectos");
    }
  };

  const handleGooglePress = async () => {
    try {
      await promptAsync({ useProxy: true });
    } catch (err) {
      console.error("Error al abrir Google Sign-In:", err);
      setError("Error al iniciar sesión con Google.");
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
          placeholder="Correo electrónico"
          placeholderTextColor="#aaa"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          style={styles.input}
          placeholder="Contraseña"
          placeholderTextColor="#aaa"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

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
          <TouchableOpacity
            style={styles.socialButton}
            onPress={handleGooglePress}
            disabled={!request}
          >
            <Icon name="logo-google" size={24} color="#fff" />
          </TouchableOpacity>
        </View>

        <TouchableOpacity onPress={() => navigation.replace("Register")}>
          <Text style={styles.registerText}>¿No tienes cuenta? Regístrate</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LoginScreen;
