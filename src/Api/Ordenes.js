const BASE_URL = "https://backenddjango-production-c48c.up.railway.app";

export async function obtenerPedidos() {
  const response = await fetch(`${BASE_URL}/api/orders/`, {
    headers: {
      Authorization: `Token ${localStorage.getItem("token")}`,
    },
  });

  if (!response.ok) throw new Error("Error al obtener los pedidos");

  return await response.json();
}

export async function CrearPedido(orderItems, status = "Pendiente") {
  const response = await fetch(`${BASE_URL}/api/orders/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify({ status, items: orderItems }),
  });

  if (!response.ok) throw new Error("Error al crear Orden");

  return await response.json();
}
