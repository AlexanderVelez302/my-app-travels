import React from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Icon from "react-native-vector-icons/Ionicons";
import { useAuth } from "./auth/AuthContext";
import HeaderNav from "../components/HeaderNavBar";
import styles from "../styles/ProfileStyles";

const ProfileScreen = ({ navigation }) => {
  const { logout, userData } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
      navigation.replace("Login");
    } catch (err) {
      console.error("Error al cerrar sesión:", err);
    }
  };

  return (
    <ScrollView style={{ flex: 1 }}>
      <HeaderNav navigation={navigation} />

      <View style={styles.card}>
        <Icon name="person-circle-outline" size={80} color="#007bff" />
        <Text style={styles.title}>Mi Perfil</Text>

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
    </ScrollView>
  );
};

export default ProfileScreen;
