import React, { useState } from "react";
import {
  View, Text, TextInput, TouchableOpacity, ImageBackground
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Icon from "react-native-vector-icons/Ionicons";
import { auth, db } from "../../constants/firebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
import {
  doc, setDoc, getDocs, collection, query, where, updateDoc
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
      // Verificar si ya existe un usuario con esa cédula
      const q = query(collection(db, "usuarios"), where("cedula", "==", cedula));
      const querySnapshot = await getDocs(q);

      // Crear usuario en Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      if (!querySnapshot.empty) {
        // ✅ Usuario ya existe → actualizar campos sin tocar el rol
        const docRef = querySnapshot.docs[0].ref;

        await updateDoc(docRef, {
          uid: user.uid,
          email: user.email,
          nombre,
          apellido,
          actualizadoEn: new Date()
        });

        console.log("✅ Usuario existente actualizado (rol preservado)");
      } else {
        // ✅ Usuario nuevo → crear nuevo documento con cédula como ID
        await setDoc(doc(db, "usuarios", cedula), {
          uid: user.uid,
          cedula,
          nombre,
          apellido,
          email,
          rol: "cliente",
          creadoEn: new Date()
        });

        console.log("✅ Nuevo usuario registrado");
      }

      navigation.replace("Home"); // o "Login" si deseas volver al login
    } catch (err) {
      console.error("🔴 Error al registrar:", err);
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
