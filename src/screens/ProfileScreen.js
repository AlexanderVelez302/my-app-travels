import React, { useState } from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Icon from "react-native-vector-icons/Ionicons";
import { useAuth } from "./auth/AuthContext";
import HeaderNav from "../components/HeaderNavBar";
import AdminPanelModal from "../components/AdminPanelModal"; // ✅ Importa el modal
import styles from "../styles/ProfileStyles";

const ProfileScreen = ({ navigation }) => {
  const { logout, userData } = useAuth();
  const [showModal, setShowModal] = useState(false); // ✅ Estado para el modal

  const handleLogout = async () => {
    try {
      await logout();
      navigation.replace("Login");
    } catch (err) {
      console.error("Error al cerrar sesión:", err);
    }
  };

  const handleAdminPanel = () => {
    setShowModal(true); // ✅ Abre el modal
  };

  return (
    <ScrollView style={{ flex: 1 }}>
      <HeaderNav navigation={navigation} />

      <View style={styles.card}>
        {/* Icono perfil */}
        <Icon name="person-circle-outline" size={80} color="#007bff" />
        <Text style={styles.title}>Mi Perfil</Text>

        {/* 🔐 Botón admin solo si el rol es admin */}
        {userData?.rol === "admin" && (
          <TouchableOpacity
            onPress={handleAdminPanel}
            style={{
              position: "absolute",
              top: 40,
              right: 35,
              backgroundColor: "#f0f0f0",
              padding: 8,
              borderRadius: 20,
              elevation: 4,
            }}
          >
            <Icon name="settings-outline" size={24} color="#333" />
          </TouchableOpacity>
        )}

        <View style={styles.infoContainer}>
          <Text style={styles.label}>Nombre:</Text>
          <Text style={styles.value}>{userData?.nombre || "No registrado"}</Text>

          <Text style={styles.label}>Apellido:</Text>
          <Text style={styles.value}>{userData?.apellido || "No registrado"}</Text>

          <Text style={styles.label}>Cédula:</Text>
          <Text style={styles.value}>{userData?.cedula || "No registrada"}</Text>

          <Text style={styles.label}>Correo:</Text>
          <Text style={styles.value}>{userData?.email || "No registrado"}</Text>

          <Text style={styles.label}>Rol:</Text>
          <Text style={styles.value}>{userData?.rol || "Usuario"}</Text>
        </View>

        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <LinearGradient colors={["#ff4d4d", "#b30000"]} style={styles.gradientButton}>
            <Text style={styles.logoutButtonText}>Cerrar sesión</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>

      {/* ✅ Modal de Panel de Admin */}
      <AdminPanelModal
        visible={showModal}
        onClose={() => setShowModal(false)}
        navigation={navigation}
      />
    </ScrollView>
  );
};

export default ProfileScreen;
