import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Image, Platform, ScrollView, Dimensions, ImageBackground } from "react-native";
import MapView, { Marker } from "react-native-maps";
import Icon from 'react-native-vector-icons/Ionicons'; 
import * as Location from 'expo-location';
import { LinearGradient } from 'expo-linear-gradient';
import { db } from "../constants/firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import { useAuth } from "../screens/auth/AuthContext";
import styles from "../styles/HomeStyles"; // Importa los estilos

const { width, height } = Dimensions.get("window");

const HomeScreen = ({ navigation }) => {
  const { user } = useAuth();
  const [location, setLocation] = useState(null);
  const [hoteles, setHoteles] = useState([]);  
  const [loading, setLoading] = useState(true);

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

  useEffect(() => {
    const fetchHoteles = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "hoteles"));
        const hotelesData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setHoteles(hotelesData);
      } catch (error) {
        console.error("Error obteniendo hoteles:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchHoteles();
  }, []);

  return (
    <View style={styles.container}>
      <ImageBackground source={require("../assets/Tokyo.png")} style={styles.backgroundImage}>
        <LinearGradient colors={["rgba(0,0,0,0.7)", "transparent"]} start={{ x: 0.5, y: 1 }} end={{ x: 0.5, y: 0 }} style={styles.header}>
          <Image source={require("../assets/Skynova_white.png")} style={styles.logo} />
          <Text style={styles.headerText}>SkyNova</Text>
        </LinearGradient>
      </ImageBackground>

      <View style={styles.navBarContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.navBar}>
          {[
            { name: "home-outline", screen: "Home" },
            { name: "calendar-outline", screen: "Calendar" },
            { name: "compass-outline", screen: "Explore" },
            { name: "notifications-outline", screen: "Notifications" }
          ].map((item, index) => (
            <TouchableOpacity key={index} style={styles.navButton} onPress={() => navigation.replace(item.screen)}>
              <Icon name={item.name} size={20} color="#fff" />
            </TouchableOpacity>
          ))}

          <TouchableOpacity style={styles.navButton} onPress={() => navigation.replace(user ? "Profile" : "Login")}>
            <Icon name="person-outline" size={20} color="#fff" />
          </TouchableOpacity>
        </ScrollView>
        <View style={styles.navBarBottomMargin} />
      </View>

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
          {location && <Marker coordinate={location} title="Tu ubicación" description="Esta es tu ubicación actual" />}
        </MapView>
      ) : (
        <View style={styles.webMapPlaceholder}>
          <Text style={styles.webMapText}>Mapa no disponible en la web</Text>
        </View>
      )}

      <View style={styles.hotelInfo}>
        <Text style={styles.hotelTitle}>Hoteles Disponibles</Text>

        {loading ? (
          <Text>Cargando hoteles...</Text>
        ) : hoteles.length > 0 ? (
          hoteles.map(hotel => (
            <View key={hotel.id} style={styles.hotelCard}>
              <Text style={styles.hotelName}>{hotel.nombre}</Text>
              <Text style={styles.hotelDescription}>{hotel.descripcion}</Text>
            </View>
          ))
        ) : (
          <Text>No hay hoteles disponibles.</Text>
        )}
      </View>
    </View>
  );
};

export default HomeScreen;
