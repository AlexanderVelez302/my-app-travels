import React, { useEffect, useRef } from "react";
import { View, Text, Image, StyleSheet, Animated } from "react-native";

const SplashScreen = ({ navigation }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current; // Animación de opacidad

  useEffect(() => {
    // Efecto de fade-in
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1500,
      useNativeDriver: true,
    }).start();

    // Simular carga y navegar a la pantalla principal
    setTimeout(() => {
      navigation.replace("Home"); // Cambia "Home" por tu pantalla principal
    }, 3500);
  }, []);

  return (
    <View style={styles.container}>
      <Animated.Image
        source={require("../../assets/Skynova.png")} // Agrega el logo en assets
        style={[styles.logo, { opacity: fadeAnim }]}
      />
      <Text style={styles.text}>Bienvenido a SkyNova</Text>
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1E90FF",
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
  text: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
  },
});
