import { Pencil, Plus, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import {
  AgregarProductos,
  obtenerProductos,
  editarProducto,
  EliminarProducto,
} from "../../../Api/Product";

export const Table_Products = () => {
  const [search,setSearch] = useState("");
  const [showModal, setShowModal] = useState("");
  const [products, SetProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 5;
  const [EditarProducto, setEditarProducto] = useState(null);
  const [newProduct, setNewProduct] = useState({
    name: "",
    description: "",
    price: "",
    stock: 0,
    is_active: true,
    is_available: true,
  });

  const handleEditChange = (e) => {
    const { name, value, type, checked } = e.target;
    setEditarProducto((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      await editarProducto(EditarProducto.id, EditarProducto);
      alert("Producto editado con éxito");
      setEditarProducto(null); // cerrar modal
    } catch (error) {
      console.error("Error al editar producto", error.message);
    }
  };

  useEffect(() => {
    async function productData() {
      try {
        const data = await obtenerProductos();
        SetProducts(data);
      } catch (error) {
        console.error("Error al obtener productos", error.message);
      }
    }
    productData();
  }, []);

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const paginated = filteredProducts.slice(
    (currentPage - 1) * productsPerPage,
    currentPage * productsPerPage
  );

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNewProduct((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleDelete = async (id) => {
    if (window.confirm("Estas Seguro De Eliminar Este Producto?")) {
      try {
        await EliminarProducto(id);
        SetProducts((prev) => prev.filter((p) => p.id !== id));
        alert("Producto Eliminado Correctamente");
      } catch (error) {
        console.error("Error al Eliminar", error);
        alert("Hubo un Error al elminar el producto");
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await AgregarProductos(newProduct);
      const data = await obtenerProductos();
      SetProducts(data);
      alert("Producto agregado con exito");
      setShowModal(false);
      setNewProduct({
        name: "",
        description: "",
        price: "",
        stock: 0,
        is_active: true,
        is_available: true,
      });
    } catch (error) {
      console.log("Error Agregar Producto", error.message);
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4 flex-wrap gap-3">
        <button
          className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 flex items-center gap-2"
          onClick={() => setShowModal(true)}
        >
          <Plus size={16} /> Agregar Producto
        </button>
        <input
          type="text"
          placeholder="Buscar por nombre..."
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
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="px-4 py-3">Código</th>
              <th className="px-4 py-3">Nombre</th>
              <th className="px-4 py-3">Precio</th>
              <th className="px-4 py-3">Descripción</th>
              <th className="px-4 py-3">Stock</th>
              <th className="px-4 py-3">Estado</th>
              <th className="px-4 py-3 text-center">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {paginated.length > 0 ? (
              paginated.map((product) => (
                <tr
                  key={product.id}
                  className="bg-white border-b hover:bg-gray-50"
                >
                  <td className="px-4 py-3">{product.id}</td>
                  <td className="px-4 py-3">{product.name}</td>
                  <td className="px-4 py-3">
                    ${Number(product.price).toFixed(2)}
                  </td>
                  <td className="px-4 py-3">{product.description}</td>
                  <td className="px-4 py-3">{product.stock}</td>
                  <td className="px-4 py-3">
                    {product.is_active ? (
                      <span className="text-green-600 font-medium">
                        Disponible
                      </span>
                    ) : (
                      <span className="text-red-600 font-medium">
                        No Disponible
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-center space-x-2">
                    <button
                      onClick={() => setEditarProducto(product)}
                      className="text-indigo-600 hover:text-indigo-800"
                    >
                      <Pencil size={18} />
                    </button>
                    <button
                      onClick={() => handleDelete(product.id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="7"
                  className="text-center py-6 text-gray-400 italic"
                >
                  No se encontraron productos.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* 🔽 PAGINACIÓN */}
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
              key={i}
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
      {/* Modal para agregar producto */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 w-full max-w-md space-y-4 shadow-xl">
            <h2 className="text-xl font-bold mb-4">Agregar Producto</h2>
            <form onSubmit={handleSubmit} className="space-y-3">
              <input
                type="text"
                name="name"
                value={newProduct.name}
                onChange={handleInputChange}
                placeholder="Nombre"
                className="w-full border px-3 py-2 rounded"
                required
              />
              <input
                type="text"
                name="description"
                value={newProduct.description}
                onChange={handleInputChange}
                placeholder="Descripción"
                className="w-full border px-3 py-2 rounded"
              />
              <input
                type="number"
                name="price"
                value={newProduct.price}
                onChange={handleInputChange}
                placeholder="Precio"
                className="w-full border px-3 py-2 rounded"
                required
              />
              <input
                type="number"
                name="stock"
                value={newProduct.stock}
                onChange={handleInputChange}
                placeholder="Stock"
                className="w-full border px-3 py-2 rounded"
                required
              />
              <div className="flex gap-4">
                <label className="flex gap-2 items-center">
                  <input
                    type="checkbox"
                    name="is_active"
                    checked={newProduct.is_active}
                    onChange={handleInputChange}
                  />
                  Activo
                </label>
                <label className="flex gap-2 items-center">
                  <input
                    type="checkbox"
                    name="is_available"
                    checked={newProduct.is_available}
                    onChange={handleInputChange}
                  />
                  Disponible
                </label>
              </div>
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400"
                  onClick={() => setShowModal(false)}
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded bg-indigo-600 text-white hover:bg-indigo-700"
                >
                  Guardar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {EditarProducto && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 w-full max-w-md space-y-4 shadow-xl">
            <h2 className="text-xl font-bold mb-4">Editar Producto</h2>
            <form onSubmit={handleEditSubmit} className="space-y-3">
              <input
                type="text"
                name="name"
                value={EditarProducto.name}
                onChange={handleEditChange}
                placeholder="Nombre"
                className="w-full border px-3 py-2 rounded"
                required
              />
              <input
                type="text"
                name="description"
                value={EditarProducto.description}
                onChange={handleEditChange}
                placeholder="Descripción"
                className="w-full border px-3 py-2 rounded"
              />
              <input
                type="number"
                name="price"
                value={EditarProducto.price}
                onChange={handleEditChange}
                placeholder="Precio"
                className="w-full border px-3 py-2 rounded"
                required
              />
              <input
                type="number"
                name="stock"
                value={EditarProducto.stock}
                onChange={handleEditChange}
                placeholder="Stock"
                className="w-full border px-3 py-2 rounded"
                required
              />
              <div className="flex gap-4">
                <label className="flex gap-2 items-center">
                  <input
                    type="checkbox"
                    name="is_active"
                    checked={EditarProducto.is_active}
                    onChange={handleEditChange}
                  />
                  Activo
                </label>
                <label className="flex gap-2 items-center">
                  <input
                    type="checkbox"
                    name="is_available"
                    checked={EditarProducto.is_available}
                    onChange={handleEditChange}
                  />
                  Disponible
                </label>
              </div>
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400"
                  onClick={() => setEditarProducto(null)}
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded bg-indigo-600 text-white hover:bg-indigo-700"
                >
                  Guardar Cambios
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
