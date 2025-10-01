import { useEffect, useState } from "react";
import axios from "axios";

const API_URL = "http://localhost:3000/api/servicios";

export default function ListaServiciosPage() {
  const [servicios, setServicios] = useState([]);

  useEffect(() => {
    axios.get(API_URL).then((res) => setServicios(res.data));
  }, []);

  const eliminarServicio = async (idServicio) => {
    await axios.delete(`${API_URL}/${idServicio}`);
    setServicios(servicios.filter((s) => s.idServicio !== idServicio));
  };

  const editarServicio = (idServicio) => {
    alert(`Editar servicio con id ${idServicio}`);
  };

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Lista de Servicios</h1>
      <table className="table-auto w-full border">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2">ID</th>
            <th className="p-2">Nombre</th>
            <th className="p-2">Descripción</th>
            <th className="p-2">Precio</th>
            <th className="p-2">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {servicios.map((s) => (
            <tr key={s.idServicio} className="border-b">
              <td className="p-2">{s.idServicio}</td>
              <td className="p-2">{s.nombre}</td>
              <td className="p-2">{s.descripcion}</td>
              <td className="p-2">{s.precio}</td>
              <td className="p-2 space-x-2">
                <button
                  onClick={() => editarServicio(s.idServicio)}
                  className="bg-yellow-500 text-white px-2 py-1 rounded"
                >
                  Editar
                </button>
                <button
                  onClick={() => eliminarServicio(s.idServicio)}
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
