const API_URL = "http://localhost:3000/api/servicios";

// Listar servicios
export async function getServicios() {
  const res = await fetch(API_URL);
  if (!res.ok) throw new Error("Error al obtener servicios");
  return res.json();
}

// Crear servicio
export async function createServicio(servicio) {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(servicio),
  });
  return res.json();
}

// Obtener servicio por ID
export async function getServicioById(id) {
  const res = await fetch(`${API_URL}/${id}`);
  return res.json();
}

// Actualizar servicio
export async function updateServicio(id, servicio) {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(servicio),
  });
  return res.json();
}

// Eliminar servicio
export async function deleteServicio(id) {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });
  return res.json();
}
