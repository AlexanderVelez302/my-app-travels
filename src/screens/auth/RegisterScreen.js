import React, { useState } from "react";
import {
  View, Text, TextInput, TouchableOpacity, ImageBackground
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { auth, db } from "../../constants/firebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
import {
  doc, setDoc, getDoc, updateDoc
} from "firebase/firestore";
import styles from "../../styles/RegisterStyles";
import { useNavigation } from "@react-navigation/native";

const RegisterScreen = () => {
  const navigation = useNavigation();
  const [cedula, setCedula] = useState("");
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
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
      // Crear usuario en Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Referencia al documento por cédula
      const userDocRef = doc(db, "usuarios", cedula);
      const existingDoc = await getDoc(userDocRef);

      if (existingDoc.exists()) {
        // Usuario ya existe → actualizar datos, conservar rol
        const datosExistentes = existingDoc.data();
        const rolActual = datosExistentes.rol || "cliente";

        await updateDoc(userDocRef, {
          uid: user.uid,
          email: user.email,
          nombre,
          apellido,
          actualizadoEn: new Date(),
          rol: rolActual,
        });

        console.log("✅ Usuario existente actualizado con rol:", rolActual);
      } else {
        // Usuario nuevo → crear documento con rol por defecto
        await setDoc(userDocRef, {
          uid: user.uid,
          cedula,
          nombre,
          apellido,
          email,
          rol: "cliente",
          creadoEn: new Date()
        });

        console.log("✅ Nuevo usuario creado con rol: cliente");
      }

      navigation.replace("Home");
    } catch (err) {
      console.error("🔴 Error al registrar:", err.message);
      setError("Error al registrarse. Intenta de nuevo.");
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
          placeholder="Cédula"
          placeholderTextColor="#aaa"
          value={cedula}
          onChangeText={setCedula}
        />
        <TextInput
          style={styles.input}
          placeholder="Nombre"
          placeholderTextColor="#aaa"
          value={nombre}
          onChangeText={setNombre}
        />
        <TextInput
          style={styles.input}
          placeholder="Apellido"
          placeholderTextColor="#aaa"
          value={apellido}
          onChangeText={setApellido}
        />
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

        <TouchableOpacity onPress={() => navigation.replace("Login")}>
          <Text style={styles.registerText}>¿Ya tienes cuenta? Inicia sesión</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default RegisterScreen;
