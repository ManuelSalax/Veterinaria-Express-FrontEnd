import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getProductoById } from "../services/productosService";
import { createPago } from "../../pagos/services/pagosService";

function DetallesProductoPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [producto, setProducto] = useState(null);
  const [loading, setLoading] = useState(true);
  const [monto, setMonto] = useState("");
  const [metodoPago, setMetodoPago] = useState("TARJETA");

  useEffect(() => {
    if (!id) {
      console.error("❌ No se recibió ID de producto en la URL");
      setLoading(false);
      return;
    }

    console.log("🔍 Cargando producto con id:", id);

    getProductoById(id)
      .then((data) => {
        console.log("✅ Producto recibido:", data);
        setProducto(data);
      })
      .catch((err) => {
        console.error("Error al cargar producto:", err);
        alert("Error al obtener el producto. Revisa la consola.");
      })
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <p className="text-center mt-10">Cargando producto...</p>;
  if (!producto) return <p className="text-center mt-10">Producto no encontrado.</p>;

  const handlePago = async (e) => {
    e.preventDefault();
    const usuario = JSON.parse(localStorage.getItem("usuario"));
    if (!usuario) {
      alert("Debes iniciar sesión antes de realizar un pago");
      navigate("/login");
      return;
    }

    try {
      const pago = {
        fechaPago: new Date().toISOString().split("T")[0],
        monto: parseFloat(monto || producto.precio),
        metodoPago,
        idCliente: usuario.idUsuario,
        idProducto: parseInt(id),
      };

      const res = await createPago(pago);
      alert(`✅ Pago registrado con estado: ${res.estado}`);
      navigate("/productos");
    } catch (err) {
      console.error("Error al realizar pago:", err);
      alert("❌ Error al procesar el pago");
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <button
        onClick={() => navigate(-1)}
        className="mb-4 text-green-600 underline"
      >
        ← Volver
      </button>

      <div className="bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-3xl font-bold text-green-700 mb-4">{producto.nombre}</h1>
        <img
          src={producto.imagen || "https://via.placeholder.com/400x300?text=Producto"}
          alt={producto.nombre}
          className="w-full h-64 object-cover rounded mb-4"
        />
        <p className="text-gray-600 mb-2">{producto.descripcion}</p>
        <p className="text-lg font-semibold text-green-700 mb-6">
          💰 Precio: ${producto.precio?.toLocaleString("es-CO")}
        </p>

        <form onSubmit={handlePago} className="space-y-4">
          <div>
            <label className="block font-semibold">💳 Monto a pagar:</label>
            <input
              type="number"
              step="0.01"
              value={monto}
              onChange={(e) => setMonto(e.target.value)}
              className="border rounded w-full p-2"
              placeholder={`Valor sugerido: ${producto.precio}`}
              required
            />
          </div>

          <div>
            <label className="block font-semibold">Método de pago:</label>
            <select
              value={metodoPago}
              onChange={(e) => setMetodoPago(e.target.value)}
              className="border rounded w-full p-2"
            >
              <option value="TARJETA">Tarjeta</option>
              <option value="EFECTIVO">Efectivo</option>
              <option value="TRANSFERENCIA">Transferencia</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition"
          >
            Confirmar Pago
          </button>
        </form>
      </div>
    </div>
  );
}

export default DetallesProductoPage;
