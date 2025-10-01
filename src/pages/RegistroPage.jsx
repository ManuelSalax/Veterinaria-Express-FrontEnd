import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function RegistroPage() {
  const navigate = useNavigate();
  const [usuarioData, setUsuarioData] = useState({
    nombre: "",
    email: "",
    telefono: "",
    password: "",
  });

  const [mascotaData, setMascotaData] = useState({
    nombre: "",
    especie: "",
    raza: "",
    edad: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
    // 1️⃣ Crear usuario
    const resUsuario = await axios.post("http://localhost:3000/api/usuarios", usuarioData);
    const usuarioCreado = resUsuario.data;

    // 2️⃣ Crear mascota vinculada usando idUsuario
    await axios.post("http://localhost:3000/api/mascotas", {
        ...mascotaData,
        idUsuario: usuarioCreado.idUsuario,
    });

    // 3️⃣ Guardar usuario en localStorage
    localStorage.setItem("usuario", JSON.stringify(usuarioCreado));

    alert("✅ Registro completado con éxito");
    navigate("/"); // Redirige al home
    } catch (error) {
    console.error("Error al registrar:", error);
    alert("❌ Ocurrió un error al registrar usuario o mascota");
    }
    };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-green-100 via-white to-green-200 px-4">
      <div className="w-full max-w-3xl bg-white shadow-2xl rounded-2xl p-8">
        {/* Título */}
        <h1 className="text-3xl font-bold text-center text-green-700 mb-6">
          Registro de Usuario y Mascota 🐶🐱
        </h1>
        <p className="text-center text-gray-600 mb-8">
          Completa tus datos y los de tu mascota para agendar tus citas con nosotros.
        </p>

        {/* Formulario */}
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Usuario */}
          <div className="col-span-1">
            <h2 className="text-xl font-semibold text-green-600 mb-4">👤 Datos del Usuario</h2>
            <input
              type="text"
              placeholder="Nombre completo"
              value={usuarioData.nombre}
              onChange={(e) => setUsuarioData({ ...usuarioData, nombre: e.target.value })}
              className="w-full p-3 border rounded-lg mb-3 focus:ring-2 focus:ring-green-400"
              required
            />
            <input
              type="email"
              placeholder="Correo electrónico"
              value={usuarioData.email}
              onChange={(e) => setUsuarioData({ ...usuarioData, email: e.target.value })}
              className="w-full p-3 border rounded-lg mb-3 focus:ring-2 focus:ring-green-400"
              required
            />
            <input
              type="text"
              placeholder="Teléfono"
              value={usuarioData.telefono}
              onChange={(e) => setUsuarioData({ ...usuarioData, telefono: e.target.value })}
              className="w-full p-3 border rounded-lg mb-3 focus:ring-2 focus:ring-green-400"
              required
            />
            <input
              type="password"
              placeholder="Contraseña"
              value={usuarioData.password}
              onChange={(e) => setUsuarioData({ ...usuarioData, password: e.target.value })}
              className="w-full p-3 border rounded-lg mb-3 focus:ring-2 focus:ring-green-400"
              required
            />
          </div>

          {/* Mascota */}
          <div className="col-span-1">
            <h2 className="text-xl font-semibold text-green-600 mb-4">🐾 Datos de la Mascota</h2>
            <input
              type="text"
              placeholder="Nombre de la mascota"
              value={mascotaData.nombre}
              onChange={(e) => setMascotaData({ ...mascotaData, nombre: e.target.value })}
              className="w-full p-3 border rounded-lg mb-3 focus:ring-2 focus:ring-green-400"
              required
            />
            <input
              type="text"
              placeholder="Especie (ej: perro, gato)"
              value={mascotaData.especie}
              onChange={(e) => setMascotaData({ ...mascotaData, especie: e.target.value })}
              className="w-full p-3 border rounded-lg mb-3 focus:ring-2 focus:ring-green-400"
              required
            />
            <input
              type="text"
              placeholder="Raza"
              value={mascotaData.raza}
              onChange={(e) => setMascotaData({ ...mascotaData, raza: e.target.value })}
              className="w-full p-3 border rounded-lg mb-3 focus:ring-2 focus:ring-green-400"
            />
            <input
              type="number"
              placeholder="Edad (años)"
              value={mascotaData.edad}
              onChange={(e) => setMascotaData({ ...mascotaData, edad: e.target.value })}
              className="w-full p-3 border rounded-lg mb-3 focus:ring-2 focus:ring-green-400"
            />
          </div>

          {/* Botón */}
          <div className="col-span-1 md:col-span-2 flex justify-center mt-4">
            <button
              type="submit"
              className="bg-green-600 text-white px-8 py-3 rounded-lg shadow-lg hover:bg-green-700 transition duration-300"
            >
              Registrar Usuario y Mascota
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default RegistroPage;
