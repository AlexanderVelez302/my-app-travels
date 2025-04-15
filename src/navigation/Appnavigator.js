import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";

// Pantallas
import SplashScreen from "../screens/SplashScreen";
import HomeScreen from "../screens/HomeScreen";
import LoginScreen from "../screens/auth/LoginScreen";
import RegisterScreen from "../screens/auth/RegisterScreen";
import ProfileScreen from "../screens/ProfileScreen"; // 👈 IMPORTANTE: importar la pantalla de perfil
import AddUserScreen from "../screens/AdminPanel/AddUserScreen";
import EditUserScreen from "../screens/AdminPanel/EditUserScreen";
import DeleteUserScreen from "../screens/AdminPanel/DeleteUserScreen";
import ViewUserScreen from "../screens/AdminPanel/ViewUserScreen"; // Asegúrate de importar esta pantalla


const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="Splash">
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Profile" component={ProfileScreen} /> 
        <Stack.Screen name="AgregarUsuario" component={AddUserScreen} />
        <Stack.Screen name="EditarUsuario" component={EditUserScreen} />
        <Stack.Screen name="EliminarUsuario" component={DeleteUserScreen} />
        <Stack.Screen name="BuscarUsuario" component={ViewUserScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
