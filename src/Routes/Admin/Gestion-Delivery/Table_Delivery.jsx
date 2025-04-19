import { useEffect, useState } from "react";
import { Pencil, Trash2 } from "lucide-react";
import { obtenerPedidos } from "../../../Api/Ordenes";

export const Table_Delivery = () => {
  const [search, setSearch] = useState("");
  const [pedidos, setPedidos] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const pedidosPorPagina = 5;

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

  const totalPages = Math.ceil(filtered.length / pedidosPorPagina);
  const paginados = filtered.slice(
    (currentPage - 1) * pedidosPorPagina,
    currentPage * pedidosPorPagina
  );

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  return (
    <div className="p-6 max-h-[80vh] overflow-y-auto">
      <div className="flex justify-between items-center mb-4 flex-wrap gap-3">
        <h2 className="text-xl font-bold text-gray-800">Órdenes de Clientes</h2>
        <input
          type="text"
          placeholder="Buscar por email..."
          className="px-4 py-2 border border-gray-300 rounded-md w-72"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setCurrentPage(1);
          }}
        />
      </div>

      <div className="overflow-x-auto shadow rounded-lg">
        <table className="min-w-full text-sm text-left text-gray-700">
          <thead className="bg-gray-800 text-white text-xs uppercase">
            <tr>
              <th className="px-6 py-3"># Orden</th>
              <th className="px-6 py-3">Email Cliente</th>
              <th className="px-6 py-3">Estado</th>
              <th className="px-6 py-3">Total</th>
              <th className="px-6 py-3">Fecha</th>
              <th className="px-6 py-3">Productos</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y">
            {paginados.length > 0 ? (
              paginados.map((pedido) => (
                <tr key={pedido.id} className="hover:bg-gray-100">
                  <td className="px-6 py-3 font-medium">#{pedido.id}</td>
                  <td className="px-6 py-3">{pedido.client_email}</td>
                  <td className="px-6 py-3 capitalize">{pedido.status}</td>
                  <td className="px-6 py-3">
                    ${Number(pedido.total_price).toFixed(2)}
                  </td>
                  <td className="px-6 py-3">
                    {new Date(pedido.created_at).toLocaleString()}
                  </td>
                  <td className="px-6 py-3">
                    <ul className="list-disc pl-4">
                      {pedido.items?.map((item, idx) => (
                        <li key={idx}>
                          {item.product_name} (x{item.quantity})
                        </li>
                      ))}
                    </ul>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="6"
                  className="text-center text-gray-400 italic px-6 py-4"
                >
                  No se encontraron pedidos.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* 🔽 Paginación */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-4 space-x-2">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            className="px-3 py-1 rounded bg-gray-300 hover:bg-gray-400 text-sm"
            disabled={currentPage === 1}
          >
            Anterior
          </button>
          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i + 1}
              onClick={() => handlePageChange(i + 1)}
              className={`px-3 py-1 rounded text-sm ${
                currentPage === i + 1
                  ? "bg-indigo-600 text-white"
                  : "bg-gray-200 hover:bg-gray-300"
              }`}
            >
              {i + 1}
            </button>
          ))}
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            className="px-3 py-1 rounded bg-gray-300 hover:bg-gray-400 text-sm"
            disabled={currentPage === totalPages}
          >
            Siguiente
          </button>
        </div>
      )}
    </div>
  );
};
