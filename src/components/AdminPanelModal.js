import React from "react";
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback
} from "react-native";
import styles from "../styles/AdminPanelStyles";
import Icon from "react-native-vector-icons/Ionicons";

const AdminPanelModal = ({ visible, onClose, navigation }) => {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Panel de Administrador</Text>

            <TouchableOpacity
              style={styles.optionButton}
              onPress={() => {
                onClose();
                navigation.navigate("AgregarUsuario");
              }}
            >
              <Text style={styles.optionText}>➕ Agregar Usuario</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.optionButton}
              onPress={() => {
                onClose();
                navigation.navigate("EditarUsuario");
              }}
            >
              <Text style={styles.optionText}>✏️ Editar Usuario</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.optionButton}
              onPress={() => {
                onClose();
                navigation.navigate("EliminarUsuario");
              }}
            >
              <Text style={styles.optionText}>🗑️ Eliminar Usuario</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.optionButton}
              onPress={() => {
                onClose();
                navigation.navigate("BuscarUsuario");
              }}
            >
              <Text style={styles.optionText}>🔍 Buscar Usuario</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.closeButton} onPress={onClose}>
              <Icon name="close-circle" size={30} color="#333" />
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default AdminPanelModal;
