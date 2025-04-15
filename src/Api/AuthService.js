const BASE_URL = "https://backenddjango-production-c48c.up.railway.app";

export async function loginUser(username, password) {
  // Obtener token
  const response = await fetch(`${BASE_URL}/api-token-auth/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ username, password })
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.detail || "Credenciales incorrectas");
  }

  const token = data.token;
  localStorage.setItem("token", token);

  // Obtener rol
  const roleResponse = await fetch(`${BASE_URL}/api/roles/`, {
    headers: {
      Authorization: `Token ${token}`
    }
  });

  const roleData = await roleResponse.json();

  if (!roleResponse.ok) {
    throw new Error(roleData.detail || "No se pudo obtener el rol");
  }

  const rol = roleData.rol;
  localStorage.setItem("rol", rol);

  return { token, rol };
}

export function getToken() {
  return localStorage.getItem("token");
}

export function isAuthenticated() {
  return !!localStorage.getItem("token");
}

export function getRol() {
  return localStorage.getItem("rol");
}

export function logoutUser() {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
}
