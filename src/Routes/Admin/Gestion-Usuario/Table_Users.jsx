import { Pencil, Trash2 } from "lucide-react";
import { useState } from "react";

const mockData = [
  {
    id: 1,
    name: "Juan Pérez",
    country: "Bolivia",
    representative: "Carlos Ruiz",
    date: "2024-04-01",
    balance: 2300,
    status: "Activo",
    activity: 80,
  },
  {
    id: 2,
    name: "Ana López",
    country: "Chile",
    representative: "María Díaz",
    date: "2024-03-28",
    balance: 1500,
    status: "Pendiente",
    activity: 60,
  },
  {
    id: 3,
    name: "Luis Mendoza",
    country: "Perú",
    representative: "Gabriel Núñez",
    date: "2024-03-20",
    balance: 300,
    status: "Inactivo",
    activity: 30,
  },
];

const getStatusColor = (status) => {
  switch (status) {
    case "Activo":
      return "bg-green-100 text-green-800";
    case "Pendiente":
      return "bg-yellow-100 text-yellow-800";
    case "Inactivo":
      return "bg-red-100 text-red-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};


export const Table_Users = () => {
  const [search, setSearch] = useState("");

  const filteredData = mockData.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6">
      <div className="flex justify-between mb-4">
        <button className="bg-gray-200 px-3 py-1 rounded-md hover:bg-gray-300">
          Limpiar filtros
        </button>
        <input
          type="text"
          placeholder="Buscar por nombre..."
          className="px-4 py-2 border rounded-md w-60"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="overflow-x-auto shadow-md rounded-lg">
        <table className="min-w-full text-sm text-left text-gray-600">
          <thead className="text-xs text-white uppercase bg-gray-800">
            <tr>
              <th scope="col" className="px-6 py-3">
                Nombre
              </th>
              <th scope="col" className="px-6 py-3">
                País
              </th>
              <th scope="col" className="px-6 py-3">
                Agente
              </th>
              <th scope="col" className="px-6 py-3">
                Fecha
              </th>
              <th scope="col" className="px-6 py-3">
                Balance
              </th>
              <th scope="col" className="px-6 py-3">
                Estado
              </th>
              <th scope="col" className="px-6 py-3">
                Actividad
              </th>
              <th scope="col" className="px-6 py-3 text-center">
                Acción
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredData.length > 0 ? (
              filteredData.map((item) => (
                <tr
                  key={item.id}
                  className="bg-white border-b hover:bg-gray-50"
                >
                  <td className="px-6 py-4 font-medium text-gray-900">
                    {item.name}
                  </td>
                  <td className="px-6 py-4">{item.country}</td>
                  <td className="px-6 py-4">{item.representative}</td>
                  <td className="px-6 py-4">{item.date}</td>
                  <td className="px-6 py-4">${item.balance.toFixed(2)}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(
                        item.status
                      )}`}
                    >
                      {item.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div
                        className="bg-blue-600 h-2.5 rounded-full"
                        style={{ width: `${item.activity}%` }}
                      ></div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center space-x-3">
                    <button className="text-gray-500 hover:text-indigo-600">
                      <Pencil size={18}/>
                    </button>
                    <button className="text-red-500 hover:text-red-800">
                      <Trash2 size={18}/>
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="px-6 py-4 text-center text-gray-500">
                  No se encontraron resultados.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
