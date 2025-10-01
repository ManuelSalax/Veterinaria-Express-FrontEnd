import { useEffect, useState } from "react";
import axios from "axios";

const API_URL = "http://localhost:3000/api/citas";

export default function ListaCitasPage() {
  const [citas, setCitas] = useState([]);

  useEffect(() => {
    axios.get(API_URL).then((res) => setCitas(res.data));
  }, []);

  const eliminarCita = async (idCita) => {
    await axios.delete(`${API_URL}/${idCita}`);
    setCitas(citas.filter((c) => c.idCita !== idCita));
  };

  const editarCita = (idCita) => {
    alert(`Editar cita con id ${idCita}`);
  };

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Lista de Citas</h1>
      <table className="table-auto w-full border">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2">ID</th>
            <th className="p-2">Fecha</th>
            <th className="p-2">Hora</th>
            <th className="p-2">Estado</th>
            <th className="p-2">Mascota</th>
            <th className="p-2">Servicio</th>
            <th className="p-2">Veterinario</th>
            <th className="p-2">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {citas.map((c) => (
            <tr key={c.idCita} className="border-b">
              <td className="p-2">{c.idCita}</td>
              <td className="p-2">{c.fecha}</td>
              <td className="p-2">{c.hora}</td>
              <td className="p-2">{c.estado}</td>
              <td className="p-2">{c.idMascota}</td>
              <td className="p-2">{c.idServicio}</td>
              <td className="p-2">{c.idVeterinario}</td>
              <td className="p-2 space-x-2">
                <button
                  onClick={() => editarCita(c.idCita)}
                  className="bg-yellow-500 text-white px-2 py-1 rounded"
                >
                  Editar
                </button>
                <button
                  onClick={() => eliminarCita(c.idCita)}
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
