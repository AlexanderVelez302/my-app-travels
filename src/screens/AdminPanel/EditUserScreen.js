import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { getDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "../../services/firebaseConfig";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useNavigation } from "@react-navigation/native";
import Ionicons from "react-native-vector-icons/Ionicons";
import styles from "../../styles/AdminPanelStyles/EditUserStyles";

const EditUserScreen = () => {
  const navigation = useNavigation();
  const [cedulaBuscar, setCedulaBuscar] = useState("");
  const [usuario, setUsuario] = useState(null);
  const [showPicker, setShowPicker] = useState(false);

  const buscarUsuario = async () => {
    if (!cedulaBuscar) {
      Alert.alert("Cédula requerida", "Ingresa la cédula del usuario.");
      return;
    }

    try {
      const docRef = doc(db, "usuarios", cedulaBuscar);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setUsuario({ ...docSnap.data(), cedula: cedulaBuscar });
      } else {
        Alert.alert("No encontrado", "No se encontró un usuario con esa cédula.");
        setUsuario(null);
      }
    } catch (error) {
      console.error("Error al buscar usuario:", error);
      Alert.alert("Error", "Hubo un problema al buscar el usuario.");
    }
  };

  const handleGuardarCambios = async () => {
    if (!usuario.nombre || !usuario.apellido || !usuario.email || !usuario.fechaNacimiento) {
      Alert.alert("Campos incompletos", "Completa todos los campos.");
      return;
    }
  
    // 🔐 Validación de correo electrónico
    if (!usuario.email.includes("@") || !usuario.email.includes(".")) {
      Alert.alert("Correo inválido", "Ingresa un correo electrónico válido.");
      return;
    }
    
    try {
      await updateDoc(doc(db, "usuarios", usuario.cedula), {
        nombre: usuario.nombre,
        apellido: usuario.apellido,
        email: usuario.email,
        fechaNacimiento: usuario.fechaNacimiento,
      });
      Alert.alert("Éxito", "Usuario actualizado correctamente.");
    } catch (error) {
      console.error("Error al actualizar:", error);
      Alert.alert("Error", "No se pudo actualizar el usuario.");
    }
  };
  

  const onDateChange = (event, selectedDate) => {
    if (event.type === "set") {
      setUsuario({ ...usuario, fechaNacimiento: selectedDate.toISOString().split("T")[0] });
      setShowPicker(false);
    } else {
      setShowPicker(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.backButton}
      >
        <Ionicons name="arrow-back" size={28} color="#333" />
      </TouchableOpacity>

      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Editar Usuario</Text>

        <TextInput
          style={styles.input}
          placeholder="Buscar por Cédula"
          keyboardType="numeric"
          value={cedulaBuscar}
          onChangeText={setCedulaBuscar}
        />

        <TouchableOpacity style={styles.button} onPress={buscarUsuario}>
          <Text style={styles.buttonText}>Buscar</Text>
        </TouchableOpacity>

        {usuario && (
          <>
            <TextInput
              style={styles.input}
              placeholder="Nombre"
              value={usuario.nombre}
              onChangeText={(text) => setUsuario({ ...usuario, nombre: text })}
            />
            <TextInput
              style={styles.input}
              placeholder="Apellido"
              value={usuario.apellido}
              onChangeText={(text) => setUsuario({ ...usuario, apellido: text })}
            />
            <TextInput
              style={styles.input}
              placeholder="Correo"
              keyboardType="email-address"
              value={usuario.email}
              onChangeText={(text) => setUsuario({ ...usuario, email: text })}
            />
            <TouchableOpacity style={styles.input} onPress={() => setShowPicker(true)}>
              <Text style={{ color: usuario.fechaNacimiento ? "#000" : "#999" }}>
                {usuario.fechaNacimiento || "Seleccionar fecha de nacimiento"}
              </Text>
            </TouchableOpacity>

            {showPicker && (
              <DateTimePicker
                mode="date"
                display={Platform.OS === "ios" ? "spinner" : "default"}
                maximumDate={new Date()}
                value={
                  usuario.fechaNacimiento
                    ? new Date(usuario.fechaNacimiento)
                    : new Date(2000, 0, 1)
                }
                onChange={onDateChange}
              />
            )}

            <Text style={styles.rolText}>Rol: {usuario.rol}</Text>

            <TouchableOpacity style={styles.button} onPress={handleGuardarCambios}>
              <Text style={styles.buttonText}>Guardar Cambios</Text>
            </TouchableOpacity>
          </>
        )}
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default EditUserScreen;
