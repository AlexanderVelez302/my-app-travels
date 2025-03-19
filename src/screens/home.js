import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image, Platform, ScrollView, Dimensions, ImageBackground } from "react-native";
import MapView, { Marker } from "react-native-maps";
import Icon from 'react-native-vector-icons/Ionicons'; 
import * as Location from 'expo-location';
import { LinearGradient } from 'expo-linear-gradient';

const { width, height } = Dimensions.get("window");

const HomeScreen = ({ navigation }) => {
  const [location, setLocation] = useState(null);

  useEffect(() => {
    const requestLocationPermission = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.log("Permiso de ubicación denegado");
        return;
      }
      let position = await Location.getCurrentPositionAsync({});
      setLocation({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });
    };
    requestLocationPermission();
  }, []);

  return (
    <View style={styles.container}>
      {/* Fondo con imagen */}
      <ImageBackground source={require("../../assets/Tokyo.png")} style={styles.backgroundImage}>
        <LinearGradient colors={["rgba(0,0,0,0.7)", "transparent"]} start={{ x: 0.5, y: 1 }} end={{ x: 0.5, y: 0 }} style={styles.header}>
          <Image source={require("../../assets/Skynova_white.png")} style={styles.logo} />
          <Text style={styles.headerText}>SkyNova</Text>
        </LinearGradient>
      </ImageBackground>

      {/* Barra de navegación superior */}
      <View style={styles.navBarContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.navBar}>
          {[
            { name: "home-outline", screen: "Home" },
            { name: "calendar-outline", screen: "Calendar" },
            { name: "compass-outline",  screen: "Explore" },
            { name: "notifications-outline",screen: "Notifications" },
            { name: "person-outline", label: "Perfil", screen: "Profile" }
          ].map((item, index) => (
            <TouchableOpacity key={index} style={styles.navButton} onPress={() => navigation.navigate(item.screen)}>
              <Icon name={item.name} size={20} color="#fff" />
            </TouchableOpacity>
          ))}
        </ScrollView>
        <View style={styles.navBarBottomMargin} />
      </View>

      {/* Mapa */}
      {Platform.OS !== 'web' ? (
        <MapView
          style={styles.map}
          region={location || {
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          showsUserLocation={true}
        >
          {location && (
            <Marker coordinate={location} title="Tu ubicación" description="Esta es tu ubicación actual" />
          )}
        </MapView>
      ) : (
        <View style={styles.webMapPlaceholder}>
          <Text style={styles.webMapText}>Mapa no disponible en la web</Text>
        </View>
      )}

      {/* Información del hotel */}
      <View style={styles.hotelInfo}>
        <Text style={styles.hotelTitle}>Hotel Ejemplo</Text>
        <Text style={styles.hotelDescription}>Descripción del hotel seleccionado.</Text>
      </View>
    </View>
  );
};

export default HomeScreen;

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
    paddingHorizontal: 23,
  },
  navButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 5,
  },
  navBarBottomMargin: {
    height: 10,
    backgroundColor: "#f5f5dc",
  },
  map: {
    flex: 1,
    width: "100%",
  },
  webMapPlaceholder: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#e0e0e0',
  },
  webMapText: {
    fontSize: 18,
    color: '#666',
  },
  hotelInfo: {
    padding: 20,
    backgroundColor: "#fff",
  },
  hotelTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  hotelDescription: {
    fontSize: 16,
    color: "#666",
  },
});