import React, { useState } from "react";
import {
  View, Text,StyleSheet , TextInput, TouchableOpacity, Dimensions, Image, ImageBackground} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Icon from "react-native-vector-icons/Ionicons";
import { useAuth } from "../auth/AuthContext";

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
      <ImageBackground
        source={require("../../../assets/Tokyo.png")}
        style={styles.backgroundImage}
      >
        <LinearGradient
          colors={["rgba(0,0,0,0.6)", "transparent"]}
          start={{ x: 0.5, y: 1 }}
          end={{ x: 0.5, y: 0 }}
          style={styles.overlay}
        />
      </ImageBackground>

      {/* Contenedor del Login */}
      <View style={styles.card}>
        <Text style={styles.title}>Bienvenido</Text>

        {error ? <Text style={styles.error}>{error}</Text> : null}

        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#aaa"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#aaa"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        {/* Checkbox y "Forgot Password" */}
        <View style={styles.row}>
          <TouchableOpacity style={styles.checkboxContainer}>
            <Icon name="checkmark-circle" size={20} color="#007bff" />
            <Text style={styles.checkboxText}>Remember me</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={styles.forgotPassword}>Forgot password?</Text>
          </TouchableOpacity>
        </View>

        {/* Botón de Login */}
        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <LinearGradient
            colors={["#007bff", "#0056b3"]}
            style={styles.gradientButton}
          >
            <Text style={styles.loginButtonText}>Log In</Text>
          </LinearGradient>
        </TouchableOpacity>

        {/* Redes sociales */}
        <Text style={styles.orText}>Log In with</Text>
        <View style={styles.socialContainer}>
          {["logo-facebook", "logo-twitter", "logo-google", "logo-apple"].map(
            (icon, index) => (
              <TouchableOpacity key={index} style={styles.socialButton}>
                <Icon name={icon} size={24} color="#fff" />
              </TouchableOpacity>
            )
          )}
        </View>

        {/* Link para registrarse */}
        <TouchableOpacity onPress={() => navigation.navigate("Register")}>
          <Text style={styles.registerText}>Sign Up</Text>
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
    justifyContent: "center",
    alignItems: "center",
  },
  backgroundImage: {
    position: "absolute",
    width: "100%",
    height: "100%",
  },
  overlay: {
    width: "100%",
    height: "100%",
    position: "absolute",
  },
  card: {
    width: width * 0.85,
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 20,
    alignItems: "center",
    elevation: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 15,
    color: "#333",
  },
  input: {
    width: "100%",
    padding: 15,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    backgroundColor: "#fff",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: 15,
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  checkboxText: {
    marginLeft: 5,
    color: "#666",
  },
  forgotPassword: {
    color: "#007bff",
    fontWeight: "500",
  },
  loginButton: {
    width: "100%",
    borderRadius: 10,
    overflow: "hidden",
    marginBottom: 10,
  },
  gradientButton: {
    padding: 15,
    alignItems: "center",
  },
  loginButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  orText: {
    color: "#999",
    marginVertical: 10,
  },
  socialContainer: {
    flexDirection: "row",
    justifyContent: "center",
    width: "100%",
  },
  socialButton: {
    backgroundColor: "#007bff",
    padding: 10,
    borderRadius: 10,
    marginHorizontal: 10,
  },
  registerText: {
    marginTop: 15,
    color: "#007bff",
    fontWeight: "500",
  },
  error: {
    color: "red",
    marginBottom: 10,
  },
});
