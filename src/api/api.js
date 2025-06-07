const BASE_URL = "http://192.168.1.3:5000"; // tu IP local

export const crearUsuario = async (datos) => {
  try {
    const response = await fetch(`${BASE_URL}/api/usuarios`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(datos),
    });

    return await response.json();
  } catch (error) {
    console.error("Error al crear usuario:", error);
    throw error;
  }
};

export const obtenerUsuarioPorCedula = async (cedula) => {
  try {
    const response = await fetch(`${BASE_URL}/api/usuarios/${cedula}`);
    return await response.json();
  } catch (error) {
    console.error("Error al obtener usuario:", error);
    throw error;
  }
};

export const editarUsuario = async (cedula, datos) => {
  try {
    const response = await fetch(`${BASE_URL}/api/usuarios/${cedula}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(datos),
    });

    return await response.json();
  } catch (error) {
    console.error("Error al editar usuario:", error);
    throw error;
  }
};

export const eliminarUsuario = async (cedula) => {
  try {
    const response = await fetch(`${BASE_URL}/api/usuarios/${cedula}`, {
      method: "DELETE",
    });

    return await response.json();
  } catch (error) {
    console.error("Error al eliminar usuario:", error);
    throw error;
  }
};
