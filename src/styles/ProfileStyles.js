import { StyleSheet, Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  backgroundImage: {
    position: "absolute",
    width: width,
    height: height * 0.5,
  },
  overlay: {
    position: "absolute",
    width: width,
    height: height * 0.5,
  },
  card: {
    marginTop: height * 0.3,
    backgroundColor: "#fff",
    marginHorizontal: 20,
    borderRadius: 20,
    padding: 25,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginVertical: 10,
    textAlign: "center",
    color: "#333",
  },
  infoContainer: {
    marginTop: 20,
  },
  label: {
    fontSize: 16,
    color: "#555",
    marginTop: 10,
  },
  value: {
    fontSize: 18,
    fontWeight: "600",
    color: "#222",
  },
  logoutButton: {
    marginTop: 30,
    borderRadius: 10,
    overflow: "hidden",
  },
  gradientButton: {
    paddingVertical: 12,
    alignItems: "center",
    borderRadius: 10,
  },
  logoutButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
