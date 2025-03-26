import React, { useState } from "react";
import { 
  View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, Dimensions, 
  Image, ImageBackground, Platform 
} from "react-native";
import Icon from 'react-native-vector-icons/Ionicons'; 
import { LinearGradient } from 'expo-linear-gradient';
import { useAuth } from "../auth/AuthContext";  // ⚠ Verifica que la ruta sea correcta

const { width, height } = Dimensions.get("window");

const LoginScreen = ({ navigation }) => {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    try {
      await login(email, password);
      navigation.navigate("Home");
    } catch (err) {
      setError("Correo o contraseña incorrectos");
    }
  };

  return (
    <View style={styles.container}>
      {/* Fondo con imagen */}
      <ImageBackground source={require("../../../assets/Tokyo.png")} style={styles.backgroundImage}>
        <LinearGradient colors={["rgba(0,0,0,0.7)", "transparent"]} start={{ x: 0.5, y: 1 }} end={{ x: 0.5, y: 0 }} style={styles.header}>
          <Image source={require("../../../assets/Skynova_white.png")} style={styles.logo} />
          <Text style={styles.headerText}>SkyNova</Text>
        </LinearGradient>
      </ImageBackground>

      {/* Barra de navegación */}
      <View style={styles.navBarContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.navBar}>
          {[
            { name: "home-outline", screen: "Home" },
            { name: "calendar-outline", screen: "Calendar" },
            { name: "compass-outline", screen: "Explore" },
            { name: "notifications-outline", screen: "Notifications" }
          ].map((item, index) => (
            <TouchableOpacity key={index} style={styles.navButton} onPress={() => navigation.navigate(item.screen)}>
              <Icon name={item.name} size={20} color="#fff" />
            </TouchableOpacity>
          ))}
          {/* Botón de perfil (Desactivado en Login) */}
          <TouchableOpacity style={styles.navButton}>
            <Icon name="person-outline" size={20} color="#fff" />
          </TouchableOpacity>
        </ScrollView>
      </View>

      {/* Formulario de Login */}
      <View style={styles.loginContainer}>
        <Text style={styles.title}>Iniciar Sesión</Text>
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
        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.loginButtonText}>Iniciar Sesión</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("Register")}>
          <Text style={styles.registerText}>¿No tienes cuenta? Regístrate</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  backgroundImage: {
    width: "100%",
    height: height * 0.20,
  },
  header: {
    paddingTop: Platform.OS === "ios" ? 50 : 30,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
    width: "100%",
    height: height * 0.20,
  },
  logo: {
    width: 60,
    height: 40,
    marginRight: 10,
  },
  headerText: {
    fontSize: 24,
    color: "#fff",
    fontWeight: "bold",
  },
  navBarContainer: {
    backgroundColor: "#000",
  },
  navBar: {
    paddingVertical: 20,
  },
  navButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#000",
    paddingHorizontal: 15,
    marginHorizontal: 5,
    borderRadius: 5,
    height: 40,
  },
  loginContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    width: "100%",
    padding: 15,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    backgroundColor: "#fff",
  },
  loginButton: {
    backgroundColor: "#007bff",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    width: "100%",
    marginTop: 10,
  },
  loginButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  registerText: {
    marginTop: 10,
    color: "#007bff",
  },
  error: {
    color: "red",
    marginBottom: 10,
  },
});
