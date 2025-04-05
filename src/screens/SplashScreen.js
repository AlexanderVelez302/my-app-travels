import React, { useEffect, useRef } from "react";
import { View, Text, Animated, Image } from "react-native";
import styles from "../styles/SplashStyles"; // Archivo de estilos separado
import { useAuth } from "./auth/AuthContext"; // Ajusta la ruta si es necesario

const SplashScreen = ({ navigation }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.5)).current;
  const { user } = useAuth();

  useEffect(() => {
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

    setTimeout(() => {
      if (user) {
        navigation.replace("Home");
      } else {
        navigation.replace("Login");
      }
    }, 3500);
  }, []);

  return (
    <View style={styles.container}>
      <Animated.Image
        source={require("../assets/Skynova_white.png")}
        style={[
          styles.logo,
          { opacity: fadeAnim, transform: [{ scale: scaleAnim }] },
        ]}
        resizeMode="contain"
      />
      <Text style={styles.text}>Bienvenido a SkyNova</Text>
    </View>
  );
};

export default SplashScreen;
