import { StyleSheet } from "react-native";

export default StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center"
  },
  modalContent: {
    backgroundColor: "#fff",
    width: "85%",
    borderRadius: 20,
    padding: 25,
    alignItems: "center",
    elevation: 10
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#007bff"
  },
  optionButton: {
    width: "100%",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderColor: "#ddd"
  },
  optionText: {
    fontSize: 16,
    color: "#333",
    textAlign: "center"
  },
  closeButton: {
    marginTop: 20
  }
});
