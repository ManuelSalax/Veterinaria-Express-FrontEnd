import React, { useEffect, useState } from "react";
import { getProductos } from "../features/productos/services/productosService";
import { useNavigate } from "react-router-dom";

const ProductosPage = () => {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const data = await getProductos();
        // Normaliza el id (por si cambia entre APIs)
        const normalizados = (data || []).map((p) => ({
          ...p,
          idForUse: p.idProducto ?? p.id ?? p.idProduct ?? null,
        }));
        setProductos(normalizados);
      } catch (err) {
        console.error("Error al obtener productos:", err);
        setError("No se pudieron cargar los productos.");
      } finally {
        setLoading(false);
      }
    };

    fetchProductos();
  }, []);

  if (loading)
    return <p className="text-center mt-10 text-gray-600">Cargando productos...</p>;

  if (error)
    return (
      <div className="max-w-2xl mx-auto mt-10 bg-red-50 border border-red-200 text-red-700 p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-2">Error</h2>
        <p>{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="mt-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Reintentar
        </button>
      </div>
    );

  if (!productos || productos.length === 0)
    return (
      <div className="text-center mt-10">
        <h2 className="text-xl font-semibold text-gray-700 mb-3">
          No hay productos disponibles
        </h2>
        <p className="text-gray-500">Intenta más tarde o revisa la API.</p>
      </div>
    );

  return (
    <div className="max-w-6xl mx-auto mt-10 px-4">
      <h1 className="text-4xl font-bold text-center text-green-700 mb-10">
        🐾 Productos Veterinaria Express
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {productos.map((p) => (
          <div
            key={p.idForUse || p.idProducto}
            className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition p-5 flex flex-col justify-between"
          >
            <div>
              <img
                src={
                  p.imagen ||
                  "https://via.placeholder.com/300x200?text=Producto+Veterinaria"
                }
                alt={p.nombre || "Producto"}
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <h3 className="text-xl font-semibold text-gray-800 mb-1">
                {p.nombre}
              </h3>
              <p className="text-gray-600 text-sm mb-2">{p.descripcion}</p>
              <p className="text-green-700 font-bold text-lg mb-4">
                💲{p.precio?.toLocaleString("es-CO")}
              </p>
            </div>

                <button
                onClick={() => {
                    if (!p.idForUse) {
                    console.error("⚠️ Producto sin id válido:", p);
                    alert("Este producto no tiene un ID válido.");
                    return;
                    }
                    navigate(`/productos/${p.idForUse}`);
                }}
                className="bg-green-600 text-white font-medium py-2 rounded-lg hover:bg-green-700 transition"
                >
                🛒 Comprar ahora
                </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductosPage;
