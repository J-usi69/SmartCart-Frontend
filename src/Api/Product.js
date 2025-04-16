import { getToken } from "./AuthService";

const BASE_URL = "http://127.0.0.1:8000/";

export async function AgregarProductos(NewProduct) {
  const token = getToken();

  const response = await fetch(`${BASE_URL}/api/products/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`,
    },
    body: JSON.stringify(NewProduct),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.detail || "Error al agregar el producto");
  }

  return data;
}

export async function obtenerProductos() {
  const token = localStorage.getItem("token");
  const response = await fetch(`${BASE_URL}/api/products/`, {
    headers: {
      Authorization: `Token ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Error al obtener productos");
  }

  return await response.json();
}

/*export async function editarProducto(ProductID){
  const token=localStorage.getItem("token");
  const response=await fetch(`${BASE_URL}/api/products/${ProductID}`,{
    headers:
  })
}*/
