import { useEffect, useState } from "react";
import { Pencil, Trash2 } from "lucide-react";
import { obtenerPedidos } from "../../../Api/Ordenes";



export const Table_Delivery = () => {
  const [search, setSearch] = useState("");
  const [pedidos, setPedidos] = useState([]);

  useEffect(() => {
    const fetchPedidos = async () => {
      try {
        const data = await obtenerPedidos();
        setPedidos(data);
      } catch (error) {
        console.error("Error al obtener pedidos:", error.message);
      }
    };
    fetchPedidos();
  }, []);

  const filtered = pedidos.filter((p) =>
    p?.client_email?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6">
      <div className="flex justify-between mb-4">
        <h2 className="text-xl font-bold">Órdenes de Clientes</h2>
        <input
          type="text"
          placeholder="Buscar por email..."
          className="border px-4 py-2 rounded-md w-72"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="overflow-x-auto rounded-lg shadow">
        <table className="min-w-full table-auto text-sm text-left text-gray-700">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="px-4 py-3"># Orden</th>
              <th className="px-4 py-3">Email Cliente</th>
              <th className="px-4 py-3">Estado</th>
              <th className="px-4 py-3">Total</th>
              <th className="px-4 py-3">Fecha</th>
              <th className="px-4 py-3">Productos</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((pedido) => (
              <tr
                key={pedido.id}
                className="bg-white border-b hover:bg-gray-50"
              >
                <td className="px-4 py-3 font-medium">#{pedido.id}</td>
                <td className="px-4 py-3">{pedido.client_email}</td>
                <td className="px-4 py-3">{pedido.status}</td>
                <td className="px-4 py-3">
                  ${Number(pedido.total_price).toFixed(2)}
                </td>
                <td className="px-4 py-3">
                  {new Date(pedido.created_at).toLocaleString()}
                </td>
                <td className="px-4 py-3">
                  <ul className="list-disc pl-4">
                    {pedido.items?.map((item, index) => (
                      <li key={index}>
                        {item.product_name} (x{item.quantity})
                      </li>
                    ))}
                  </ul>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
