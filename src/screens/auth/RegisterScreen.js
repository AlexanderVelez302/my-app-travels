import React, { useState } from "react";
import {
  View, Text, TextInput, TouchableOpacity, ImageBackground
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Icon from "react-native-vector-icons/Ionicons";
import { auth } from "../../constants/firebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
import styles from "../../styles/RegisterStyles"; // archivo aparte
import { useNavigation } from "@react-navigation/native";

const RegisterScreen = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      setError("Las contraseñas no coinciden");
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigation.replace("Home");
    } catch (err) {
      setError("Error al registrarse. Intenta de nuevo.");
      console.log("🔴", err);
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
        <Text style={styles.title}>Crea tu cuenta</Text>

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
        <TextInput
          style={styles.input}
          placeholder="Confirmar contraseña"
          placeholderTextColor="#aaa"
          secureTextEntry
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />

        <TouchableOpacity style={styles.loginButton} onPress={handleRegister}>
          <LinearGradient
            colors={["#28a745", "#218838"]}
            style={styles.gradientButton}
          >
            <Text style={styles.loginButtonText}>Registrarse</Text>
          </LinearGradient>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
          <Text style={styles.registerText}>¿Ya tienes cuenta? Inicia sesión</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default RegisterScreen;
