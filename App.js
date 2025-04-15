import React from "react";
import { AuthProvider } from "./src/screens/auth/AuthContext";
import AppNavigator from "./src/navigation/AppNavigator"; 

const App = () => {
  return (
    <AuthProvider>
      <AppNavigator />
    </AuthProvider>
  );
};

export default App;
