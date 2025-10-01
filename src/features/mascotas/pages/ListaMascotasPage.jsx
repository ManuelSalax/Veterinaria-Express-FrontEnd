import { useEffect, useState } from "react";
import axios from "axios";

const API_URL = "http://localhost:3000/api/mascotas";

export default function ListaMascotasPage() {
  const [mascotas, setMascotas] = useState([]);

  useEffect(() => {
    axios.get(API_URL).then((res) => setMascotas(res.data));
  }, []);

  const eliminarMascota = async (idMascota) => {
    await axios.delete(`${API_URL}/${idMascota}`);
    setMascotas(mascotas.filter((m) => m.idMascota !== idMascota));
  };

  const editarMascota = (idMascota) => {
    alert(`Editar mascota con id ${idMascota}`);
  };

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Lista de Mascotas</h1>
      <table className="table-auto w-full border">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2">ID</th>
            <th className="p-2">Nombre</th>
            <th className="p-2">Especie</th>
            <th className="p-2">Raza</th>
            <th className="p-2">Edad</th>
            <th className="p-2">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {mascotas.map((m) => (
            <tr key={m.idMascota} className="border-b">
              <td className="p-2">{m.idMascota}</td>
              <td className="p-2">{m.nombre}</td>
              <td className="p-2">{m.especie}</td>
              <td className="p-2">{m.raza}</td>
              <td className="p-2">{m.edad}</td>
              <td className="p-2 space-x-2">
                <button
                  onClick={() => editarMascota(m.idMascota)}
                  className="bg-yellow-500 text-white px-2 py-1 rounded"
                >
                  Editar
                </button>
                <button
                  onClick={() => eliminarMascota(m.idMascota)}
                  className="bg-red-500 text-white px-2 py-1 rounded"
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
