import { useEffect, useState } from "react";
import axios from "axios";

const API_URL = "http://localhost:3000/api/productos";

export default function ListaProductosPage() {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    axios.get(API_URL).then((res) => setProductos(res.data));
  }, []);

  const eliminarProducto = async (idProducto) => {
    await axios.delete(`${API_URL}/${idProducto}`);
    setProductos(productos.filter((p) => p.idProducto !== idProducto));
  };

  const editarProducto = (idProducto) => {
    alert(`Editar producto con id ${idProducto}`);
  };

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Lista de Productos</h1>
      <table className="table-auto w-full border">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2">ID</th>
            <th className="p-2">Nombre</th>
            <th className="p-2">Descripción</th>
            <th className="p-2">Precio</th>
            <th className="p-2">Stock</th>
            <th className="p-2">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {productos.map((p) => (
            <tr key={p.idProducto} className="border-b">
              <td className="p-2">{p.idProducto}</td>
              <td className="p-2">{p.nombre}</td>
              <td className="p-2">{p.descripcion}</td>
              <td className="p-2">{p.precio}</td>
              <td className="p-2">{p.stock}</td>
              <td className="p-2 space-x-2">
                <button
                  onClick={() => editarProducto(p.idProducto)}
                  className="bg-yellow-500 text-white px-2 py-1 rounded"
                >
                  Editar
                </button>
                <button
                  onClick={() => eliminarProducto(p.idProducto)}
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

