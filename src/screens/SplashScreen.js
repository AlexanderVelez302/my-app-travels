import React, { useEffect, useRef } from "react";
import { View, Text, Animated } from "react-native";
import { splashStyles as styles } from "../styles/SplashStyles"; // Asegúrate que este archivo existe
import { useNavigation } from "@react-navigation/native"; // ✅ Importar useNavigation

const SplashScreen = () => {
  const fadeAnim = useRef(new Animated.Value(0)).current; // Animación de opacidad
  const scaleAnim = useRef(new Animated.Value(0.5)).current; // Animación de escala
  const navigation = useNavigation(); // ✅ Usar hook para acceder a navigation

  useEffect(() => {
    // Animaciones en paralelo
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

    // Ir a la pantalla principal tras 3.5 segundos
    const timeout = setTimeout(() => {
      navigation.replace("Home"); // ✅ Redirige a la pantalla "Home"
    }, 3500);

    return () => clearTimeout(timeout); // Limpieza
  }, []);

  return (
    <View style={styles.container}>
      <Animated.Image
        source={require("../assets/Skynova_white.png")} // ✅ Revisa que la ruta esté correcta
        style={[
          styles.logo,
          {
            opacity: fadeAnim,
            transform: [{ scale: scaleAnim }],
          },
        ]}
      />
      <Text style={styles.text}>Bienvenido a SkyNova</Text>
    </View>
  );
};

export default SplashScreen;
