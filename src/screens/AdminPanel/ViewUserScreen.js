import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  ScrollView,
  Keyboard,
  TouchableWithoutFeedback,
  Platform,
  KeyboardAvoidingView,
} from "react-native";
import { getDoc, doc } from "firebase/firestore";
import { db } from "../../constants/firebaseConfig";
import { useNavigation } from "@react-navigation/native";
import Ionicons from "react-native-vector-icons/Ionicons";
import styles from "../../styles/AdminPanelStyles/ViewUserStyles";

const ViewUserScreen = () => {
  const navigation = useNavigation();
  const [cedulaBuscar, setCedulaBuscar] = useState("");
  const [usuario, setUsuario] = useState(null);
  const [loading, setLoading] = useState(false);

  const buscarUsuario = async () => {
    if (!cedulaBuscar.trim()) {
      Alert.alert("Cédula requerida", "Ingresa la cédula del usuario.");
      return;
    }

    Keyboard.dismiss();
    setLoading(true);
    try {
      const docRef = doc(db, "usuarios", cedulaBuscar.trim());
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setUsuario({ ...docSnap.data(), cedula: docSnap.id });
      } else {
        Alert.alert("No encontrado", "No se encontró un usuario con esa cédula.");
        setUsuario(null);
      }
    } catch (error) {
      console.error("Error al buscar usuario:", error);
      Alert.alert("Error", "Ocurrió un problema al buscar el usuario.");
    }
    setLoading(false);
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>

        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <Text style={styles.title}>Consultar Usuario</Text>

          <TextInput
            style={styles.input}
            placeholder="Buscar por Cédula"
            keyboardType="numeric"
            value={cedulaBuscar}
            onChangeText={setCedulaBuscar}
          />

          <TouchableOpacity
            style={styles.button}
            onPress={buscarUsuario}
            disabled={loading}
          >
            <Text style={styles.buttonText}>Buscar</Text>
          </TouchableOpacity>

          {usuario && (
            <View style={styles.userData}>
              <Text style={styles.userText}>Nombre: {usuario.nombre}</Text>
              <Text style={styles.userText}>Apellido: {usuario.apellido}</Text>
              <Text style={styles.userText}>Correo: {usuario.email}</Text>
              <Text style={styles.userText}>Cédula: {usuario.cedula}</Text>
              <Text style={styles.userText}>Fecha de Nacimiento: {usuario.fechaNacimiento}</Text>
              <Text style={styles.userText}>Rol: {usuario.rol}</Text>
            </View>
          )}
        </ScrollView>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

export default ViewUserScreen;
