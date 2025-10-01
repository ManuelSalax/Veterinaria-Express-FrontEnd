import React, { useState, useEffect } from "react";
import axios from "axios";

const HomePage = () => {
  const [usuario, setUsuario] = useState(null);
  const [servicios, setServicios] = useState([]);
  const [mascotas, setMascotas] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedServicio, setSelectedServicio] = useState(null);
  const [formData, setFormData] = useState({ idMascota: "", fecha: "", hora: "" });
  const [showNoMascotaModal, setShowNoMascotaModal] = useState(false);

  // Cargar usuario logueado
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("usuario"));
    if (storedUser) {
      setUsuario(storedUser);
      fetchMascotas(storedUser.idUsuario);
    }
  }, []);

  // Cargar servicios
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

  // Cargar mascotas del usuario
  const fetchMascotas = async (idUsuario) => {
    try {
      const res = await axios.get("http://localhost:3000/api/mascotas");
      const misMascotas = res.data.filter((m) => m.idUsuario === idUsuario);
      setMascotas(misMascotas);
    } catch (error) {
      console.error("Error al cargar mascotas:", error);
    }
  };

  // Abrir modal para agendar cita
  const openModal = (servicio) => {
    if (!usuario) return alert("Debes iniciar sesión para agendar una cita");
    setSelectedServicio(servicio);

    if (mascotas.length === 0) {
      setShowNoMascotaModal(true);
    } else {
      setModalOpen(true);
    }
  };

  // Cerrar modal y resetear formulario
  const closeModal = () => {
    setModalOpen(false);
    setSelectedServicio(null);
    setFormData({ idMascota: "", fecha: "", hora: "" });
  };

  const closeNoMascotaModal = () => {
    setShowNoMascotaModal(false);
    setSelectedServicio(null);
  };

  // Agendar cita
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
        idVeterinario: 4, // temporal
      });
      alert("Cita agendada con éxito");
      closeModal();
    } catch (error) {
      console.error("Error al agendar cita:", error);
      alert("Error al agendar cita");
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Banner */}
      <div className="bg-green-600 rounded-lg h-64 flex items-center justify-center mb-8">
        <h1 className="text-white text-4xl font-bold text-center">
          Bienvenido a Veterinaria Salud+
        </h1>
      </div>

      {/* Servicios */}
      <h2 className="text-3xl font-bold mb-6 text-center">Nuestros Servicios</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {servicios.map((servicio) => (
          <div
            key={servicio.idServicio}
            className="bg-white p-4 rounded shadow hover:shadow-lg cursor-pointer transition"
            onClick={() => openModal(servicio)}
          >
            <h3 className="text-xl font-semibold mb-2">{servicio.nombre}</h3>
            <p className="text-gray-700">{servicio.descripcion}</p>
            <p className="font-bold mt-2">Precio: ${servicio.precio}</p>
          </div>
        ))}
      </div>

      {/* Modal para agendar cita */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md relative">
            <h2 className="text-2xl font-bold mb-4">
              Agendar Cita: {selectedServicio.nombre}
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

              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={closeModal}
                  className="bg-gray-400 text-white px-3 py-1 rounded hover:bg-gray-500"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                >
                  Agendar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal cuando no hay mascotas */}
      {showNoMascotaModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md relative">
            {/* Botón cerrar */}
            <button
              onClick={closeNoMascotaModal}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 font-bold text-xl"
            >
              ✕
            </button>
            <p className="text-center text-lg">
              No tienes mascotas registradas. Regístrala primero.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePage;
