import React, { useEffect, useRef } from "react";
import { View, Text, StyleSheet, Animated } from "react-native";

const SplashScreen = ({ navigation }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current; // Animación de opacidad
  const scaleAnim = useRef(new Animated.Value(0.5)).current; // Animación de escala

  useEffect(() => {
    // Efecto de fade-in y scale-up
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1500,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 1500,
        useNativeDriver: true,
      }),
    ]).start();

    // Simular carga y navegar a la pantalla principal
    setTimeout(() => {
      navigation.replace("Home"); // Cambia "Home" por tu pantalla principal
    }, 3500);
  }, []);

  return (
    <View style={styles.container}>
      <Animated.Image
        source={require("../../assets/Skynova_white.png")} // Agrega el logo en assets
        style={[styles.logo, { opacity: fadeAnim, transform: [{ scale: scaleAnim }] }]}
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
    borderRadius: 75, // Aplicar redondeo al logo
  },
  text: {
    fontSize: 24,
    color: "#fff",
    fontWeight: "bold",
  },
});
