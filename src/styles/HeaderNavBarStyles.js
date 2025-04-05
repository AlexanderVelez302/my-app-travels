import { StyleSheet, Dimensions, Platform } from "react-native";

const { height } = Dimensions.get("window");

export default StyleSheet.create({
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
    paddingHorizontal: 23,
    marginHorizontal: 5,
    borderRadius: 5,
    height: 40,
  },
  navBarBottomMargin: {
    height: 10,
    backgroundColor: "#f5f5dc",
  },
});
