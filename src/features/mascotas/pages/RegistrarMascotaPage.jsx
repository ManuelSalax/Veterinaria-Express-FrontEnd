import React, { useState, useEffect } from "react";
import axios from "axios";

const RegistrarMascotaPage = () => {
  const [usuario, setUsuario] = useState(null);
  const [formData, setFormData] = useState({
    nombre: "",
    especie: "",
    raza: "",
    edad: "",
  });

  // Cargar usuario logueado
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("usuario"));
    if (!storedUser) {
      alert("Debes iniciar sesión para registrar una mascota");
      return;
    }
    setUsuario(storedUser);
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { nombre, especie, raza, edad } = formData;
    if (!nombre || !especie || !raza || !edad) {
      return alert("Todos los campos son obligatorios");
    }

    try {
      await axios.post("http://localhost:3000/api/mascotas", {
        ...formData,
        edad: parseInt(edad),
        idCliente: usuario.idUsuario,
      });
      alert("Mascota registrada con éxito");
      setFormData({ nombre: "", especie: "", raza: "", edad: "" });
    } catch (error) {
      console.error("Error al registrar mascota:", error);
      alert("Hubo un error al registrar la mascota");
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded shadow mt-6">
      <h1 className="text-2xl font-bold mb-4 text-center">Registrar Mascota</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          name="nombre"
          placeholder="Nombre de la mascota"
          value={formData.nombre}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        />
        <input
          type="text"
          name="especie"
          placeholder="Especie (Perro, Gato, etc.)"
          value={formData.especie}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        />
        <input
          type="text"
          name="raza"
          placeholder="Raza"
          value={formData.raza}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        />
        <input
          type="number"
          name="edad"
          placeholder="Edad (años)"
          value={formData.edad}
          onChange={handleChange}
          className="border p-2 rounded"
          min={0}
          required
        />
        <button
          type="submit"
          className="bg-green-500 text-white px-3 py-2 rounded hover:bg-green-600 transition"
        >
          Registrar Mascota
        </button>
      </form>
    </div>
  );
};

export default RegistrarMascotaPage;
