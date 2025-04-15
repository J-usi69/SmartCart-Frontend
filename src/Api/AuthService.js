const BASE_URL = "https://backenddjango-production-c48c.up.railway.app";

export async function loginUser(username, password) {
  const response = await fetch(`${BASE_URL}/api-token-auth/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ username, password })
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.detail || "Error al iniciar sesión");
  }

  // Guardamos token
  localStorage.setItem("token", data.token);

  // Si el backend devuelve el ID del usuario, descomenta esta parte:
  // const user = await fetchUser(data.user_id, data.token);
  // localStorage.setItem("user", JSON.stringify(user));

  return data;
}

export async function fetchUser(userId, token) {
  const response = await fetch(`${BASE_URL}/api/users/${userId}/`, {
    headers: {
      Authorization: `Token ${token}`
    }
  });

  if (!response.ok) {
    throw new Error("No se pudo obtener el usuario");
  }

  return await response.json();
}

export function getToken() {
  return localStorage.getItem("token");
}

export function isAuthenticated(){
  return !!localStorage.getItem("token");
}

export function logoutUser() {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
}
