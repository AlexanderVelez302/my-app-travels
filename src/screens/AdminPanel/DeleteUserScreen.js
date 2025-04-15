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
  KeyboardAvoidingView
} from "react-native";
import { getDoc, doc, deleteDoc } from "firebase/firestore";
import { db } from "../../constants/firebaseConfig";
import { useNavigation } from "@react-navigation/native";
import Ionicons from "react-native-vector-icons/Ionicons";
import styles from "../../styles/AdminPanelStyles/DeleteUserStyles";

const DeleteUserScreen = () => {
  const navigation = useNavigation();
  const [cedulaBuscar, setCedulaBuscar] = useState("");
  const [usuario, setUsuario] = useState(null);
  const [loading, setLoading] = useState(false);

  // Función para buscar usuario por cédula
  const buscarUsuario = async () => {
    if (!cedulaBuscar) {
      Alert.alert("Cédula requerida", "Ingresa la cédula del usuario.");
      return;
    }

    // Cerrar el teclado antes de realizar cualquier acción
    Keyboard.dismiss();

    setLoading(true);
    try {
      const docRef = doc(db, "usuarios", cedulaBuscar);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        // Agregar la cédula manualmente para poder usarla luego
        setUsuario({ ...docSnap.data(), cedula: docSnap.id });
      } else {
        Alert.alert("No encontrado", "No se encontró un usuario con esa cédula.");
        setUsuario(null);
      }
    } catch (error) {
      console.error("Error al buscar usuario:", error);
      Alert.alert("Error", "Hubo un problema al buscar el usuario.");
    }
    setLoading(false);
  };

  // Función para eliminar el usuario
  const handleEliminarUsuario = async () => {
    Alert.alert(
      "Confirmar eliminación",
      "¿Estás seguro de que deseas eliminar este usuario? Esta acción no se puede deshacer. Para una eliminación completa, por favor contacta con soporte.",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Eliminar",
          style: "destructive",
          onPress: async () => {
            setLoading(true);
            try {
              await deleteDoc(doc(db, "usuarios", usuario.cedula));
              Alert.alert("Éxito", "Usuario eliminado correctamente de la base de datos.");
              setUsuario(null); // Limpiar el estado después de eliminar
              setCedulaBuscar(""); // Limpiar la búsqueda
              navigation.goBack(); // Opcional: volver atrás
            } catch (error) {
              console.error("Error al eliminar el usuario:", error);
              Alert.alert("Error", "No se pudo eliminar el usuario.");
            }
            setLoading(false);
          },
        },
      ]
    );
  };

  return (
    // Usamos TouchableWithoutFeedback para cerrar el teclado al hacer clic fuera de los campos
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : "height"} // Ajuste para iOS y Android
      >
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          {/* Botón de retroceso */}
          <TouchableOpacity
                  onPress={() => navigation.goBack()}
                  style={{ position: "absolute", top: 55, left: 1, zIndex: 10 }}
                >
                  <Ionicons name="arrow-back" size={28} color="#333" />
                </TouchableOpacity>

          <Text style={styles.title}>Eliminar Usuario</Text>

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
            <>
              <View style={styles.userData}>
                <Text style={styles.userText}>Nombre: {usuario.nombre}</Text>
                <Text style={styles.userText}>Correo: {usuario.email}</Text>
                <Text style={styles.userText}>Cédula: {usuario.cedula}</Text>
                <Text style={styles.userText}>Fecha de Nacimiento: {usuario.fechaNacimiento}</Text>
                <Text style={styles.userText}>Rol: {usuario.rol}</Text>
              </View>

              <TouchableOpacity
                style={[styles.button, styles.confirmButton]}
                onPress={handleEliminarUsuario}
                disabled={loading}
              >
                <Text style={styles.buttonText}>Eliminar Usuario</Text>
              </TouchableOpacity>
            </>
          )}
        </ScrollView>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

export default DeleteUserScreen;
