import { useEffect, useState } from "react";
import { obtenerProductosRecomendados } from "../../Api/Product";

export const Home = () => {
  const [productosRecomendados, setProductoRecomendados] = useState([]);

  useEffect(() => {
    const cargarProductos = async () => {
      try {
        const data = await obtenerProductosRecomendados();
        setProductoRecomendados(data);
      } catch (error) {
        console.error("Error al Cargar Productos", error.message);
      }
    };
    cargarProductos();
  }, []);

  return (
    <div className="bg-gray-100">
      {/* Hero Section */}
      <section className="bg-black text-white py-16 px-6 text-center">
        <h1 className="text-4xl font-bold mb-4">Plantronics BackBeat Pro</h1>
        <p className="text-lg mb-6">
          Sonido profesional para amantes de la música
        </p>
        <button className="bg-green-500 px-6 py-2 rounded-full font-semibold hover:bg-green-600">
          Ver producto
        </button>
      </section>

      {/* Productos Recomendados */}
      <section className="py-12 px-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          Recomendados para ti
        </h2>

        {productosRecomendados.length === 0 ? (
          <p className="text-center text-gray-500">
            No hay recomendaciones disponibles.
          </p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {productosRecomendados.map((producto) => (
              <div
                key={producto.id}
                className="bg-white rounded-lg shadow p-4 flex flex-col items-center"
              >
                {/* Imagen si tienes una */}
                {producto.image_url ? (
                  <img
                    src={producto.image_url}
                    alt={producto.name}
                    className="w-32 h-32 object-cover rounded mb-4"
                  />
                ) : (
                  <div className="w-32 h-32 bg-gray-200 rounded mb-4" />
                )}

                <h3 className="text-sm font-semibold text-center mb-1">
                  {producto.name}
                </h3>
                <p className="text-green-700 font-bold text-sm">
                  ${Number(producto.price).toFixed(2)}
                </p>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};
