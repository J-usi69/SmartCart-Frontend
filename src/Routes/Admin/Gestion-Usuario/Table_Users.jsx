import { Pencil, Plus, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { obtenerUsuarios, EditarUsuarios } from "../../../Api/Users";

export const Table_Users = () => {
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState([]);
  //const [EditarUsuario, setEditarUsuario] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 5;



  useEffect(() => {
    async function UserData() {
      try {
        const data = await obtenerUsuarios();
        setUsers(data);
      } catch (error) {
        console.error("Error al obtener productos", error.message);
      }
    }
    UserData();
  }, []);

  const filteredData = users.filter((user) =>
    user?.nombre?.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(filteredData.length / usersPerPage);
  const paginatedUsers = filteredData.slice(
    (currentPage - 1) * usersPerPage,
    currentPage * usersPerPage
  );

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4 flex-wrap gap-3">
        <button className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 flex items-center gap-2">
          <Plus size={18} /> Agregar Usuario
        </button>
        <input
          type="text"
          placeholder="Buscar por nombre..."
          className="px-4 py-2 border border-gray-300 rounded-md w-72"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setCurrentPage(1); // resetear página al buscar
          }}
        />
      </div>

      <div className="overflow-x-auto rounded-lg shadow-lg">
        <table className="min-w-full text-sm text-left text-gray-700">
          <thead className="bg-gray-800 text-white text-xs uppercase">
            <tr>
              <th className="px-6 py-3">Código</th>
              <th className="px-6 py-3">Nombre</th>
              <th className="px-6 py-3">Apellido</th>
              <th className="px-6 py-3">Correo</th>
              <th className="px-6 py-3">Password</th>
              <th className="px-6 py-3">Rol</th>
              <th className="px-6 py-3">Estado</th>
              <th className="px-6 py-3 text-center">Acción</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y">
            {paginatedUsers.length > 0 ? (
              paginatedUsers.map((user) => (
                <tr key={user.id} className="hover:bg-gray-100">
                  <td className="px-6 py-3">{user.id}</td>
                  <td className="px-6 py-3">{user.nombre}</td>
                  <td className="px-6 py-3">{user.apellido}</td>
                  <td className="px-6 py-3">{user.correo}</td>
                  <td className="px-6 py-3">{user.password}</td>
                  <td className="px-6 py-3">
                    <span
                      className={`font-medium ${
                        user.is_staff ? "text-green-600" : "text-red-600"
                      }`}
                    >
                      {user.is_staff ? "Administrador" : "Cliente"}
                    </span>
                  </td>
                  <td className="px-6 py-3">
                    <span
                      className={`font-medium ${
                        user.is_active ? "text-green-600" : "text-red-600"
                      }`}
                    >
                      {user.is_active ? "Activo" : "No Activo"}
                    </span>
                  </td>
                  <td className="px-6 py-3 text-center space-x-3">
                    <button className="text-gray-500 hover:text-indigo-600">
                      <Pencil size={18} />
                    </button>
                    <button className="text-red-500 hover:text-red-700">
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="8"
                  className="text-center px-6 py-4 text-gray-400 italic"
                >
                  No se encontraron resultados.
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
