import React, { useState, useEffect } from "react";
import axios from "axios";

const CitasPage = () => {
  const [usuario, setUsuario] = useState(null);
  const [servicios, setServicios] = useState([]);
  const [mascotas, setMascotas] = useState([]);
  const [selectedServicio, setSelectedServicio] = useState(null);
  const [formData, setFormData] = useState({ idMascota: "", fecha: "", hora: "" });
  const [showModal, setShowModal] = useState(false);

  // ✅ Cargar usuario logueado y sus mascotas
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("usuario"));
    if (storedUser) {
      setUsuario(storedUser);
      fetchMascotas(storedUser.idUsuario);
    }
  }, []);

  // ✅ Cargar servicios desde el backend
  useEffect(() => {
    const fetchServicios = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/servicios");
        setServicios(res.data);
      } catch (error) {
        console.error("Error al cargar servicios:", error);
      }
    };
    fetchServicios();
  }, []);

  // ✅ Cargar mascotas del usuario
  const fetchMascotas = async (idUsuario) => {
    try {
      const res = await axios.get("http://localhost:3000/api/mascotas");
      const misMascotas = res.data.filter((m) => m.idUsuario === idUsuario);
      setMascotas(misMascotas);
    } catch (error) {
      console.error("Error al cargar mascotas:", error);
    }
  };

  // ✅ Abrir modal al seleccionar un servicio
  const handleAgendarClick = (servicio) => {
    if (!usuario) {
      alert("Debes iniciar sesión para agendar una cita");
      return;
    }
    setSelectedServicio(servicio);
    setShowModal(true);
  };

  // ✅ Cerrar modal
  const closeModal = () => {
    setShowModal(false);
    setSelectedServicio(null);
    setFormData({ idMascota: "", fecha: "", hora: "" });
  };

  // ✅ Agendar cita
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.idMascota || !formData.fecha || !formData.hora) {
      return alert("Todos los campos son obligatorios");
    }

    try {
      await axios.post("http://localhost:3000/api/citas", {
        fecha: formData.fecha,
        hora: formData.hora,
        estado: "PENDIENTE",
        idMascota: parseInt(formData.idMascota),
        idServicio: selectedServicio.idServicio,
        idVeterinario: 4, // Temporal: puedes reemplazar por el veterinario autenticado
      });

      alert("✅ Cita agendada con éxito");
      closeModal();
    } catch (error) {
      console.error("Error al agendar cita:", error);
      alert("❌ Error al agendar la cita. Verifica los datos e intenta de nuevo.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-6">
      <div className="max-w-5xl mx-auto">
        {/* Encabezado */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-green-700 mb-4">
            Agenda tu Cita Veterinaria 🐾
          </h1>
          <p className="text-gray-600">
            Selecciona uno de nuestros servicios disponibles y elige la mascota, fecha y hora.
          </p>
        </div>

        {/* Lista de servicios */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {servicios.map((servicio) => (
            <div
              key={servicio.idServicio}
              className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition"
            >
              <h3 className="text-xl font-semibold mb-2 text-green-600">{servicio.nombre}</h3>
              <p className="text-gray-700 mb-4">{servicio.descripcion}</p>
              <p className="font-bold mb-4">💲 {servicio.precio}</p>
              <button
                onClick={() => handleAgendarClick(servicio)}
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
              >
                Agendar Cita
              </button>
            </div>
          ))}
        </div>

        {/* Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md relative">
              {/* Botón de cerrar */}
              <button
                onClick={closeModal}
                className="absolute top-3 right-3 text-gray-500 hover:text-red-500 text-xl font-bold"
              >
                ✕
              </button>

              {mascotas.length === 0 ? (
                <div className="text-center">
                  <h3 className="text-xl font-bold mb-4">No tienes mascotas registradas 🐶</h3>
                  <p className="text-gray-600 mb-6">
                    Registra una mascota antes de poder agendar una cita.
                  </p>
                  <button
                    onClick={() => (window.location.href = "/registro")}
                    className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
                  >
                    Registrar Mascota
                  </button>
                </div>
              ) : (
                <>
                  <h2 className="text-2xl font-bold mb-4 text-green-700">
                    Agendar: {selectedServicio?.nombre}
                  </h2>

                  <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <select
                      value={formData.idMascota}
                      onChange={(e) => setFormData({ ...formData, idMascota: e.target.value })}
                      className="border p-2 rounded"
                      required
                    >
                      <option value="">Selecciona tu mascota</option>
                      {mascotas.map((m) => (
                        <option key={m.idMascota} value={m.idMascota}>
                          {m.nombre} ({m.especie})
                        </option>
                      ))}
                    </select>

                    <input
                      type="date"
                      value={formData.fecha}
                      onChange={(e) => setFormData({ ...formData, fecha: e.target.value })}
                      className="border p-2 rounded"
                      required
                    />

                    <input
                      type="time"
                      value={formData.hora}
                      onChange={(e) => setFormData({ ...formData, hora: e.target.value })}
                      className="border p-2 rounded"
                      required
                    />

                    <button
                      type="submit"
                      className="bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
                    >
                      Confirmar Cita
                    </button>
                  </form>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CitasPage;
