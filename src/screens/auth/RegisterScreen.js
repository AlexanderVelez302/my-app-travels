import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, ImageBackground, Platform } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { auth, db } from "../../services/firebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc, getDoc, updateDoc } from "firebase/firestore";
import styles from "../../styles/RegisterStyles";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "../auth/AuthContext";
import DateTimePicker from "@react-native-community/datetimepicker";

const RegisterScreen = () => {
  const navigation = useNavigation();
  const { setUserData } = useAuth();

  const [cedula, setCedula] = useState("");
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [fechaNacimiento, setFechaNacimiento] = useState(null);
  const [showPicker, setShowPicker] = useState(false);
  const [error, setError] = useState("");

  const formatDate = (date) => {
    return date.toLocaleDateString("es-ES");
  };

  const calcularEdad = (fecha) => {
    const hoy = new Date();
    const nacimiento = new Date(fecha);
    let edad = hoy.getFullYear() - nacimiento.getFullYear();
    const m = hoy.getMonth() - nacimiento.getMonth();
    if (m < 0 || (m === 0 && hoy.getDate() < nacimiento.getDate())) {
      edad--;
    }
    return edad;
  };

  const validarCampos = () => {
    if (!cedula || !nombre || !apellido || !email || !password || !confirmPassword || !fechaNacimiento) {
      setError("Todos los campos son obligatorios.");
      return false;
    }

    if (!/^\d+$/.test(cedula)) {
      setError("La cédula debe contener solo números.");
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Ingresa un correo electrónico válido.");
      return false;
    }

    if (password.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres.");
      return false;
    }

    if (password !== confirmPassword) {
      setError("Las contraseñas no coinciden.");
      return false;
    }

    const edad = calcularEdad(fechaNacimiento);
    if (edad < 18) {
      setError("Debes ser mayor de 18 años.");
      return false;
    }

    return true;
  };

 const handleRegister = async () => {
  setError(""); // limpiar errores previos
  if (!validarCampos()) return;

  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    const userDocRef = doc(db, "usuarios", cedula);
    const existingDoc = await getDoc(userDocRef);

    const userData = {
      cedula,
      nombre,
      apellido,
      email,
      fechaNacimiento: fechaNacimiento.toISOString().split("T")[0],
      rol: "cliente",
      uid: user.uid, // nuevo campo: guardamos el UID del usuario
    };

    if (existingDoc.exists()) {
      await updateDoc(userDocRef, userData);
    } else {
      await setDoc(userDocRef, userData);
    }

    const updatedDoc = await getDoc(userDocRef);
    if (updatedDoc.exists()) {
      setUserData(updatedDoc.data());
    }

    navigation.replace("Home");
  } catch (err) {
    console.error("🔴 Error al registrar:", err.message);
    setError("No se pudo completar el registro. Intenta de nuevo.");
  }
};

  

  return (
    <View style={styles.container}>
      <ImageBackground source={require("../../assets/Tokyo.png")} style={styles.backgroundImage}>
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

        <TextInput style={styles.input} placeholder="Cédula" placeholderTextColor="#aaa" value={cedula} onChangeText={setCedula} />
        <TextInput style={styles.input} placeholder="Nombre" placeholderTextColor="#aaa" value={nombre} onChangeText={setNombre} />
        <TextInput style={styles.input} placeholder="Apellido" placeholderTextColor="#aaa" value={apellido} onChangeText={setApellido} />
        <TextInput style={styles.input} placeholder="Correo electrónico" placeholderTextColor="#aaa" value={email} onChangeText={setEmail} />
        <TextInput style={styles.input} placeholder="Contraseña" placeholderTextColor="#aaa" secureTextEntry value={password} onChangeText={setPassword} />
        <TextInput style={styles.input} placeholder="Confirmar contraseña" placeholderTextColor="#aaa" secureTextEntry value={confirmPassword} onChangeText={setConfirmPassword} />

        <TouchableOpacity style={styles.input} onPress={() => setShowPicker(true)}>
          <Text style={{ color: fechaNacimiento ? "#000" : "#aaa" }}>
            {fechaNacimiento ? formatDate(fechaNacimiento) : "Seleccionar fecha de nacimiento"}
          </Text>
        </TouchableOpacity>

        {showPicker && (
          <DateTimePicker
            mode="date"
            value={fechaNacimiento || new Date(2000, 0, 1)}
            display={Platform.OS === "ios" ? "spinner" : "default"}
            maximumDate={new Date()}
            onChange={(event, selectedDate) => {
              setShowPicker(false);
              if (selectedDate) {
                setFechaNacimiento(selectedDate);
              }
            }}
          />
        )}

        <TouchableOpacity style={styles.loginButton} onPress={handleRegister}>
          <LinearGradient colors={["#28a745", "#218838"]} style={styles.gradientButton}>
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
