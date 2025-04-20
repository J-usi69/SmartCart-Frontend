import { useNavigate } from "react-router-dom";
import { eliminarOrderItem, obtenerMisPedidos } from "../../../Api/Order";
import { useEffect, useState } from "react";

export const Historial = () => {
  const [items, setItems] = useState([]);

  const navigate = useNavigate(); // si usás react-router

  const handleEditar = (item) => {
    const parsedItem = {
      id: item.product,
      name: item.product_name,
      quantity: item.quantity,
      itemId: item.id,
      price: item.price || 0, // 👈 asegúrate de que venga desde el backend o lo llenás manualmente
      description: item.description || "", // 👈 lo mismo aquí
    };

    console.log("Item que se va al carrito:", parsedItem);
    localStorage.setItem("editar_order_item", JSON.stringify(parsedItem));
    navigate("/Client/Carrito"); // redirigir a la vista del carrito
  };

  const handleEliminar = async (id) => {
    if (
      confirm("¿Estás seguro que deseas eliminar este producto del pedido?")
    ) {
      try {
        await eliminarOrderItem(id);
        alert("Item eliminado con éxito");

        // Refrescar el estado del historial correctamente:
        const actualizados = await obtenerMisPedidos();
        setItems(actualizados);
      } catch (error) {
        console.error("Error al eliminar el item del pedido:", error.message);
      }
    }
  };

  useEffect(() => {
    const cargarOrderItems = async () => {
      try {
        const data = await obtenerMisPedidos();
        setItems(data);
      } catch (error) {
        console.error("Error al cargar Order Items:", error.message);
      }
    };
    cargarOrderItems();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Detalle de Items de Orden</h2>

      <div className="overflow-x-auto rounded-lg shadow">
        <table className="w-full table-auto bg-white text-center">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="p-3">ID</th>
              <th className="p-3">Nombre del Producto</th>
              <th className="p-3">Cantidad</th>
              <th className="p-3">ID Producto</th>
              <th className="p-3">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id} className="border-b hover:bg-gray-100">
                <td className="p-3">{item.id}</td>
                <td className="p-3">{item.product_name}</td>
                <td className="p-3">{item.quantity}</td>
                <td className="p-3">{item.product}</td>
                <td className="px-4 py-2 text-center space-x-2">
                  <button
                    onClick={() => handleEditar(item)}
                    className="bg-yellow-400 text-white px-2 py-1 rounded hover:bg-yellow-500 text-sm"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleEliminar(item.id)}
                    className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 text-sm"
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
