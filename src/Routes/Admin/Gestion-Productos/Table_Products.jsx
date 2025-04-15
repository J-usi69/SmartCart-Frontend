import { useState } from "react";

const sampleProducts = [
  {
    id: 1,
    code: "P001",
    name: "Laptop HP",
    image: "product-bamboo-watch.jpg",
    price: 1200,
    category: "Electronics",
    rating: 4,
    inventoryStatus: "INSTOCK",
  },
  {
    id: 2,
    code: "P002",
    name: "Camisa Polo",
    image: "product-black-watch.jpg",
    price: 80,
    category: "Clothing",
    rating: 3,
    inventoryStatus: "LOWSTOCK",
  },
  {
    id: 3,
    code: "P003",
    name: "Audífonos Sony",
    image: "product-blue-band.jpg",
    price: 150,
    category: "Accessories",
    rating: 5,
    inventoryStatus: "OUTOFSTOCK",
  },
];

const statusStyle = {
  INSTOCK: "bg-green-100 text-green-800",
  LOWSTOCK: "bg-yellow-100 text-yellow-800",
  OUTOFSTOCK: "bg-red-100 text-red-800",
};

export const Table_Products = () => {
  const [search, setSearch] = useState("");
  const filteredProducts = sampleProducts.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );
  return (
    <div className="p-6">
      {/* Toolbar */}
      <div className="flex justify-between mb-4">
        <div className="space-x-2">
          <button className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700">
            <i className="pi pi-plus mr-2"></i>Nuevo
          </button>
          <button className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700">
            <i className="pi pi-trash mr-2"></i>Eliminar
          </button>
        </div>
        <div className="flex items-center space-x-2">
          <input
            type="file"
            className="border px-2 py-1 rounded"
            accept="image/*"
          />
          <button className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600">
            <i className="pi pi-upload mr-2"></i>Exportar
          </button>
        </div>
      </div>

      {/* Tabla */}
      <div className="overflow-x-auto shadow rounded-lg">
        <table className="min-w-full text-sm text-left text-gray-700">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="px-4 py-3">Código</th>
              <th className="px-4 py-3">Nombre</th>
              <th className="px-4 py-3">Imagen</th>
              <th className="px-4 py-3">Precio</th>
              <th className="px-4 py-3">Categoría</th>
              <th className="px-4 py-3">Rating</th>
              <th className="px-4 py-3">Estado</th>
              <th className="px-4 py-3 text-center">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map((product) => (
              <tr
                key={product.id}
                className="bg-white border-b hover:bg-gray-50"
              >
                <td className="px-4 py-3 font-medium">{product.code}</td>
                <td className="px-4 py-3">{product.name}</td>
                <td className="px-4 py-3">
                  <img
                    src={`https://primefaces.org/cdn/primeng/images/demo/product/${product.image}`}
                    alt={product.name}
                    className="w-16 rounded"
                  />
                </td>
                <td className="px-4 py-3">${product.price.toFixed(2)}</td>
                <td className="px-4 py-3">{product.category}</td>
                <td className="px-4 py-3">{"★".repeat(product.rating)}</td>
                <td className="px-4 py-3">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      statusStyle[product.inventoryStatus]
                    }`}
                  >
                    {product.inventoryStatus}
                  </span>
                </td>
                <td className="px-4 py-3 text-center space-x-2">
                  <button className="text-indigo-600 hover:text-indigo-800">
                    <i className="pi pi-pencil"></i>
                  </button>
                  <button className="text-red-600 hover:text-red-800">
                    <i className="pi pi-trash"></i>
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
