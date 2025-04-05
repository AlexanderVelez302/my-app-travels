import { StyleSheet, Dimensions, Platform } from "react-native";

const { height } = Dimensions.get("window");

export default StyleSheet.create({
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
  hotelCard: {
    padding: 10,
    backgroundColor: "#f8f8f8",
    marginBottom: 10,
    borderRadius: 5,
  },
  hotelName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  hotelDescription: {
    fontSize: 16,
    color: "#666",
  },
});
