import React, { useEffect, useState } from "react";
import axios from "axios";

const ListaUsuariosPage = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [usuarioEditando, setUsuarioEditando] = useState(null);
  const [formData, setFormData] = useState({ nombre: "", email: "", rol: "" });

  useEffect(() => {
    fetchUsuarios();
  }, []);

  const fetchUsuarios = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/usuarios");
      setUsuarios(response.data);
    } catch (error) {
      console.error("Error al obtener usuarios:", error);
    }
  };

  const eliminarUsuario = async (idUsuario) => {
    try {
      await axios.delete(`http://localhost:3000/api/usuarios/${idUsuario}`);
      setUsuarios(usuarios.filter((u) => u.idUsuario !== idUsuario));
    } catch (error) {
      console.error("Error al eliminar usuario:", error);
    }
  };

  const abrirEditar = (usuario) => {
    setUsuarioEditando(usuario);
    setFormData({ nombre: usuario.nombre, email: usuario.email, rol: usuario.rol });
  };

  const cerrarEditar = () => {
    setUsuarioEditando(null);
    setFormData({ nombre: "", email: "", rol: "" });
  };

  const guardarCambios = async () => {
    try {
      await axios.put(
        `http://localhost:3000/api/usuarios/${usuarioEditando.idUsuario}`,
        formData
      );
      setUsuarios(
        usuarios.map((u) =>
          u.idUsuario === usuarioEditando.idUsuario ? { ...u, ...formData } : u
        )
      );
      cerrarEditar();
    } catch (error) {
      console.error("Error al editar usuario:", error);
    }
  };

  // Estilos según rol
  const rolClass = (rol) => {
    switch (rol) {
      case "ADMIN":
        return "bg-red-100 text-red-700 font-semibold px-2 py-1 rounded";
      case "CLIENTE":
        return "bg-purple-100 text-purple-700 font-semibold px-2 py-1 rounded";
      case "VETERINARIO":
        return "bg-green-100 text-green-700 font-semibold px-2 py-1 rounded";
      default:
        return "bg-gray-100 text-gray-700 px-2 py-1 rounded";
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Lista de Usuarios</h1>
      <table className="w-full border border-gray-300 shadow-lg rounded-lg overflow-hidden">
        <thead className="bg-green-600 text-white">
          <tr>
            <th className="p-3 text-left">ID Usuario</th>
            <th className="p-3 text-left">Nombre</th>
            <th className="p-3 text-left">Email</th>
            <th className="p-3 text-left">Rol</th>
            <th className="p-3 text-left">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map((usuario) => (
            <tr key={usuario.idUsuario} className="border-b hover:bg-gray-100">
              <td className="p-3">{usuario.idUsuario}</td>
              <td className="p-3">{usuario.nombre}</td>
              <td className="p-3">{usuario.email}</td>
              <td className="p-3">
                <span className={rolClass(usuario.rol)}>{usuario.rol}</span>
              </td>
              <td className="p-3 flex gap-2">
                <button
                  onClick={() => abrirEditar(usuario)}
                  className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition"
                >
                  Editar
                </button>
                <button
                  onClick={() => eliminarUsuario(usuario.idUsuario)}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal de edición */}
      {usuarioEditando && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4">Editar Usuario</h2>
            <input
              type="text"
              placeholder="Nombre"
              value={formData.nombre}
              onChange={(e) =>
                setFormData({ ...formData, nombre: e.target.value })
              }
              className="w-full border p-2 rounded mb-3"
            />
            <input
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              className="w-full border p-2 rounded mb-3"
            />
            <select
              value={formData.rol}
              onChange={(e) =>
                setFormData({ ...formData, rol: e.target.value })
              }
              className="w-full border p-2 rounded mb-3"
            >
              <option value="">Seleccionar rol</option>
              <option value="ADMIN">ADMIN</option>
              <option value="CLIENTE">CLIENTE</option>
              <option value="VETERINARIO">VETERINARIO</option>
            </select>
            <div className="flex justify-end gap-2">
              <button
                onClick={cerrarEditar}
                className="bg-gray-400 text-white px-3 py-1 rounded hover:bg-gray-500"
              >
                Cancelar
              </button>
              <button
                onClick={guardarCambios}
                className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
              >
                Guardar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ListaUsuariosPage;
