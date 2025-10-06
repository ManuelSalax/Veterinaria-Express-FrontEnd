// src/features/pagos/pages/PagosPage.jsx
import React, { useEffect, useState } from "react";
import {
  registrarPago,
  listarPagos,
  eliminarPagoPorId,
} from "../services/pagosService";

const PagosPage = () => {
  const [pagos, setPagos] = useState([]);
  const [form, setForm] = useState({
    fechaPago: "",
    monto: "",
    metodoPago: "",
    idCliente: "",
    idProducto: "",
  });
  const [loading, setLoading] = useState(false);

  // Cargar pagos al iniciar
  useEffect(() => {
    cargarPagos();
  }, []);

  const cargarPagos = async () => {
    try {
      const data = await listarPagos();
      setPagos(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.fechaPago || !form.monto || !form.metodoPago || !form.idCliente || !form.idProducto) {
      return alert("⚠️ Todos los campos son obligatorios");
    }

    setLoading(true);
    try {
      const nuevoPago = await registrarPago({
        ...form,
        monto: parseFloat(form.monto),
        idCliente: parseInt(form.idCliente),
        idProducto: parseInt(form.idProducto),
      });

      alert(`✅ Pago registrado: Estado "${nuevoPago.estado}"`);
      setForm({
        fechaPago: "",
        monto: "",
        metodoPago: "",
        idCliente: "",
        idProducto: "",
      });
      cargarPagos();
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleEliminar = async (idPago) => {
    if (!window.confirm("¿Seguro que deseas eliminar este pago?")) return;
    try {
      await eliminarPagoPorId(idPago);
      alert("🗑️ Pago eliminado correctamente");
      cargarPagos();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-center text-green-600 mb-8">
        Gestión de Pagos 💳
      </h1>

      {/* Formulario */}
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-lg p-6 mb-8 grid grid-cols-1 md:grid-cols-2 gap-4"
      >
        <input
          type="date"
          name="fechaPago"
          value={form.fechaPago}
          onChange={handleChange}
          className="border p-2 rounded"
          placeholder="Fecha de pago"
        />
        <input
          type="number"
          name="monto"
          value={form.monto}
          onChange={handleChange}
          className="border p-2 rounded"
          placeholder="Monto"
        />

        <select
          name="metodoPago"
          value={form.metodoPago}
          onChange={handleChange}
          className="border p-2 rounded"
        >
          <option value="">Método de pago</option>
          <option value="EFECTIVO">Efectivo</option>
          <option value="TARJETA">Tarjeta</option>
          <option value="TRANSFERENCIA">Transferencia</option>
        </select>

        <input
          type="number"
          name="idCliente"
          value={form.idCliente}
          onChange={handleChange}
          className="border p-2 rounded"
          placeholder="ID Cliente"
        />

        <input
          type="number"
          name="idProducto"
          value={form.idProducto}
          onChange={handleChange}
          className="border p-2 rounded"
          placeholder="ID Producto"
        />

        <button
          type="submit"
          className="bg-green-500 text-white font-semibold py-2 rounded hover:bg-green-600 transition mt-2"
          disabled={loading}
        >
          {loading ? "Procesando..." : "Registrar Pago"}
        </button>
      </form>

      {/* Tabla de pagos */}
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-4">Historial de Pagos</h2>
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-green-100 text-left">
              <th className="border p-2">ID</th>
              <th className="border p-2">Fecha</th>
              <th className="border p-2">Monto</th>
              <th className="border p-2">Método</th>
              <th className="border p-2">Estado</th>
              <th className="border p-2">Cliente</th>
              <th className="border p-2">Producto</th>
              <th className="border p-2 text-center">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {pagos.map((pago) => (
              <tr key={pago.idPago} className="hover:bg-gray-100">
                <td className="border p-2">{pago.idPago}</td>
                <td className="border p-2">{pago.fechaPago}</td>
                <td className="border p-2">${pago.monto}</td>
                <td className="border p-2">{pago.metodoPago}</td>
                <td
                  className={`border p-2 font-semibold ${
                    pago.estado === "COMPLETADO"
                      ? "text-green-600"
                      : pago.estado === "PENDIENTE"
                      ? "text-yellow-600"
                      : "text-red-600"
                  }`}
                >
                  {pago.estado}
                </td>
                <td className="border p-2">{pago.idCliente}</td>
                <td className="border p-2">{pago.idProducto}</td>
                <td className="border p-2 text-center">
                  <button
                    onClick={() => handleEliminar(pago.idPago)}
                    className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
            {pagos.length === 0 && (
              <tr>
                <td colSpan="8" className="text-center p-4 text-gray-500">
                  No hay pagos registrados
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PagosPage;
