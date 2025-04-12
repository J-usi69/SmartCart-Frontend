import { data } from "autoprefixer";

const Base_URL = "https://backenddjango-production-c48c.up.railway.app";

export async function loginUser(email, password) {
  try {
    const response = await fetch(`${Base_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Error al Iniciar Sesion");
    }

    localStorage.setItem("token", data.acess_token);
    localStorage.setItem("user_id", data.user_id);

    return data;
  } catch (error) {
    throw error();
  }
}
