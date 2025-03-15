import React from "react";
import { View, Text, StyleSheet } from "react-native";

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Bienvenido a SkyNova</Text>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f5f5f5",
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
  },
});
