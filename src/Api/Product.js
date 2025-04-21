import { getToken } from "./AuthService";

const BASE_URL = import.meta.env.VITE_API_URL

export async function AgregarProductos(NewProduct) {
  const token = getToken();

  const response = await fetch(`${BASE_URL}/products/`, {
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
  const response = await fetch(`${BASE_URL}/products/`, {
    headers: {
      Authorization: `Token ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Error al obtener productos");
  }

  return await response.json();
}

export async function editarProducto(ProductID, updateProduct) {
  const token = localStorage.getItem("token");
  const response = await fetch(`${BASE_URL}/products/${ProductID}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`,
    },
    body: JSON.stringify(updateProduct),
  });

  if (!response.ok) {
    throw new Error("Error Al Editar Producto");
  }
  
  return await response.json();
}

export async function EliminarProducto(ProductID){
  const token = localStorage.getItem("token");
  const response = await fetch(`${BASE_URL}/products/${ProductID}/`, {
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

export async function obtenerProductosRecomendados(){
  const token = localStorage.getItem("token");
  const response = await fetch(`${BASE_URL}/products/recommendations/`, {
    headers: {
      Authorization: `Token ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Error al obtener productos");
  }

  return await response.json();
}

export async function AplicarDescuento(productId,descuento){
  const token = localStorage.getItem("token");
  const response = await fetch(`${BASE_URL}/products/${productId}/apply_discount/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`,
    },
    body: JSON.stringify({
      has_discount:true,
      discount_percentage: descuento,
    }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    console.error("Error detalle:", errorData);
    throw new Error("Error al aplicar descuento");
  }

  return await response.json();
}