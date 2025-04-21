const BASE_URL = import.meta.env.VITE_API_URL;

export async function loginUser(username, password) {
  const response = await fetch(`${BASE_URL}-token-auth/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username,
      password,
    }),
  });
  if (!response.ok) {
    throw new Error("Credenciales inválidas");
  }

  const data = await response.json(); // { token: 'abc123' }
  const token = data.token;
  localStorage.setItem("token", token);

  // 🔁 Ahora obtenemos los datos del usuario
  const userResponse = await fetch(`${BASE_URL}/me/`, {
    headers: {
      Authorization: `Token ${token}`,
    },
  });

  if (!userResponse.ok) {
    throw new Error("No se pudo obtener la información del usuario");
  }

  const user = await userResponse.json();
  return user; //
}

export function getToken() {
  return localStorage.getItem("token");
}
