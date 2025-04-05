import React from "react";
import { AuthProvider } from "./src/screens/auth/AuthContext";
import AppNavigator from "./src/navigation/AppNavigator"; // Asegurar la "N" mayúscula

const App = () => {
  return (
    <AuthProvider>
      <AppNavigator />
    </AuthProvider>
  );
};

export default App;
