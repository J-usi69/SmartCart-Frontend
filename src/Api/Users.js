import { getToken } from "./AuthService";

const BASE_URL = import.meta.env.VITE_API_URL;

export async function obtenerUsuarios() {
  const token = getToken();

  const response = await fetch(`${BASE_URL}/users/`, {
    headers: {
      Authorization: `Token ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Error al obtener Usuarios");
  }
  return await response.json();
}

export async function EditarUsuarios(UsuarioId, updateUsuario) {
  const token = localStorage.getItem("token");
  const response = await fetch(`${BASE_URL}/users/${UsuarioId}/`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`,
    },
    body: JSON.stringify({
      nombre: updateUsuario.nombre,
      apellido: updateUsuario.apellido,
      correo: updateUsuario.correo,
      is_active: updateUsuario.is_active,
      is_staff: updateUsuario.is_staff,
      password: updateUsuario.password || "1234", // ❗ por ahora ponle algo genérico o pide que no sea requerido en el backend
      rol_id: Number(updateUsuario.rol_id) || 1, // Puedes ajustar esto si manejas roles
    }),
  });
  if (!response.ok) {
    const errorData = await response.json();
    console.error("Detalles del error:", errorData); // Esto te dará pistas exactas
    throw new Error("Error al Editar el Usuario");
  }

  return await response.json();
}

export async function RegistrarCliente(nombre, apellido, correo, password) {
  const response = await fetch(`${BASE_URL}/register-cliente/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      nombre,
      apellido,
      correo,
      password,
    }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error("Error al registrar cliente: " + JSON.stringify(errorData));
  }

  return await response.json();
}

export async function eliminarUsuario(UsuarioId) {
  const token = localStorage.getItem("token");
  const response = await fetch(`${BASE_URL}/users/${UsuarioId}/`, {
    method: "DELETE",
    headers: {
      Authorization: `Token ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Error Al Eliminar El Producto");
  }

  return true;
}

export async function agregarUsuario(NewUser) {
  const token = getToken();

  const response = await fetch(`${BASE_URL}/users/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`,
    },
    body: JSON.stringify(NewUser),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.detail || "Error al agregar el producto");
  }

  return data;
}
