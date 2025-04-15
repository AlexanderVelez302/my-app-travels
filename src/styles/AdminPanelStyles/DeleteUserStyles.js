import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
    justifyContent: "flex-start", // Aseguramos que el contenido no quede en el medio
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 30,
    marginTop: 50,
    color: "#333", // Color más suave para el título
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 12,
    marginBottom: 20,
    borderRadius: 8,
    fontSize: 16,
    backgroundColor: "#f9f9f9", // Fondo suave para el input
  },
  button: {
    backgroundColor: "#ff4d4d",
    padding: 14,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 20,
    shadowColor: "#000", // Agregamos sombra para hacerlo más atractivo
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5, // Solo para Android
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  confirmButton: {
    backgroundColor: "#28a745", // Verde para confirmar
    marginTop: 20,
  },
  confirmButtonText: {
    color: "#fff",
    fontSize: 18,
  },
  userData: {
    backgroundColor: "#f4f4f4", // Fondo para los datos del usuario
    borderRadius: 8,
    padding: 20,
    marginBottom: 30,
    marginTop: 20,
    shadowColor: "#000", // Agregar sombra para dar profundidad
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2, // Solo para Android
  },
  userText: {
    fontSize: 16,
    color: "#333",
    marginBottom: 10, // Espacio entre los datos
  },
  warningText: {
    color: "#ff4d4d",
    fontSize: 16,
    textAlign: "center",
    marginTop: 30,
  },
});

export default styles;
