import React, { useEffect, useState } from "react";
import { View, Text, Platform, Dimensions, ScrollView } from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import HeaderNav from "../components/HeaderNavBar";
import styles from "../styles/HomeStyles";
import { db } from "../services/firebaseConfig";
import { collection, getDocs } from "firebase/firestore";

const { width, height } = Dimensions.get("window");

const HomeScreen = ({ navigation }) => {
  const [location, setLocation] = useState(null);
  const [hoteles, setHoteles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const requestLocationPermission = async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Permiso de ubicación denegado");
        return;
      }
      const position = await Location.getCurrentPositionAsync({});
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
        const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setHoteles(data);
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
      <HeaderNav navigation={navigation} />

      {Platform.OS !== "web" ? (
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
