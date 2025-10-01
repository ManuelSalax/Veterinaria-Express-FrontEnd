const API_URL = "http://localhost:3000/api/citas";

// Listar citas
export async function getCitas() {
  const res = await fetch(API_URL);
  if (!res.ok) throw new Error("Error al obtener citas");
  return res.json();
}

// Crear cita
export async function createCita(cita) {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(cita),
  });
  return res.json();
}

// Obtener cita por ID
export async function getCitaById(id) {
  const res = await fetch(`${API_URL}/${id}`);
  return res.json();
}

// Actualizar cita
export async function updateCita(id, cita) {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(cita),
  });
  return res.json();
}

// Eliminar cita
export async function deleteCita(id) {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });
  return res.json();
}
