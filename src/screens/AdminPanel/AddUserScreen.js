import React, { useState } from "react";
import {View,Text,TextInput,TouchableOpacity,Alert,ScrollView,Platform,KeyboardAvoidingView,} from "react-native";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { db, auth } from "../../services/firebaseConfig";
import DateTimePicker from "@react-native-community/datetimepicker";
import styles from "../../styles/AdminPanelStyles/AddUserStyles";
import { useNavigation } from "@react-navigation/native";
import Ionicons from "react-native-vector-icons/Ionicons";

const AddUserScreen = () => {
  const navigation = useNavigation();
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [cedula, setCedula] = useState("");
  const [fechaNacimiento, setFechaNacimiento] = useState(null);
  const [email, setEmail] = useState("");
  const [showPicker, setShowPicker] = useState(false);

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
    if (!nombre || !apellido || !cedula || !fechaNacimiento || !email) {
      Alert.alert("Campos incompletos", "Por favor, completa todos los campos.");
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      Alert.alert("Correo inválido", "Ingresa un correo válido.");
      return false;
    }

    if (!/^\d+$/.test(cedula)) {
      Alert.alert("Cédula inválida", "La cédula debe contener solo números.");
      return false;
    }

    const edad = calcularEdad(fechaNacimiento);
    if (edad < 18) {
      Alert.alert("Edad inválida", "El usuario debe ser mayor de 18 años.");
      return false;
    }

    return true;
  };    

  const handleGuardar = async () => {
    if (!validarCampos()) return;

    try {
      const usuarioRef = doc(db, "usuarios", cedula);
      const usuarioSnap = await getDoc(usuarioRef);

      if (usuarioSnap.exists()) {
        Alert.alert("Usuario existente", "Ya existe un usuario con esta cédula.");
        return;
      }

      // Crear usuario en Firebase Auth usando la cédula como contraseña
      console.log("Cédula usada como contraseña:", cedula);
      const userCredential = await createUserWithEmailAndPassword(auth, email, cedula);
      console.log("Usuario creado:", userCredential.user);

      // Guardar en Firestore
      const nuevoUsuario = {
        nombre,
        apellido,
        cedula,
        fechaNacimiento: fechaNacimiento.toISOString().split("T")[0],
        email,
        rol: "cliente",
      };

      await setDoc(usuarioRef, nuevoUsuario);
      Alert.alert("Éxito", "Usuario agregado correctamente.");

      // Limpiar campos
      setNombre("");
      setApellido("");
      setCedula("");
      setFechaNacimiento(null);
      setEmail("");
    } catch (error) {
      console.error("Error al agregar usuario:", error.code, error.message);
      let mensaje = "No se pudo guardar el usuario.";
      if (error.code === "auth/email-already-in-use") {
        mensaje = "El correo ya está en uso por otro usuario.";
      }
      Alert.alert("Error", mensaje);
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={{ position: "absolute", top: 70, left: 20, zIndex: 10 }}
      >
        <Ionicons name="arrow-back" size={28} color="#333" />
      </TouchableOpacity>

      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Agregar Usuario</Text>

        <TextInput
          style={styles.input}
          placeholder="Nombre"
          value={nombre}
          onChangeText={setNombre}
        />

        <TextInput
          style={styles.input}
          placeholder="Apellido"
          value={apellido}
          onChangeText={setApellido}
        />

        <TextInput
          style={styles.input}
          placeholder="Cédula"
          keyboardType="numeric"
          value={cedula}
          onChangeText={setCedula}
        />

        <TouchableOpacity
          style={styles.input}
          onPress={() => setShowPicker(true)}
        >
          <Text style={{ color: fechaNacimiento ? "#000" : "#999" }}>
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
              if (event.type === "set") {
                setFechaNacimiento(selectedDate);
                setShowPicker(false);
              } else if (event.type === "dismissed") {
                setShowPicker(false);
              }
            }}
          />
        )}

        <TextInput
          style={styles.input}
          placeholder="Correo electrónico"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />

        <TouchableOpacity style={styles.button} onPress={handleGuardar}>
          <Text style={styles.buttonText}>Guardar</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default AddUserScreen;
