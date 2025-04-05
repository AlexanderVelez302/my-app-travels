import React from "react";
import { View, Text, TouchableOpacity, Image, ScrollView, Platform, ImageBackground } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { LinearGradient } from "expo-linear-gradient";
import { useAuth } from "../screens/auth/AuthContext";
import styles from "../styles/HeaderNavBarStyles";

const HeaderNavBar = ({ navigation }) => {
  const { user } = useAuth();

  return (
    <>
      <ImageBackground source={require("../assets/Tokyo.png")} style={styles.backgroundImage}>
        <LinearGradient
          colors={["rgba(0,0,0,0.7)", "transparent"]}
          start={{ x: 0.5, y: 1 }}
          end={{ x: 0.5, y: 0 }}
          style={styles.header}
        >
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
            { name: "notifications-outline", screen: "Notifications" },
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
    </>
  );
};

export default HeaderNavBar;
