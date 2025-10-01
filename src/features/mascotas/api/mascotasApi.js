const API_URL = "http://localhost:3000/api/mascotas";

// Listar mascotas
export async function getMascotas() {
  const res = await fetch(API_URL);
  if (!res.ok) throw new Error("Error al obtener mascotas");
  return res.json();
}

// Crear mascota
export async function createMascota(mascota) {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(mascota),
  });
  return res.json();
}

// Obtener mascota por ID
export async function getMascotaById(id) {
  const res = await fetch(`${API_URL}/${id}`);
  return res.json();
}

// Actualizar mascota
export async function updateMascota(id, mascota) {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(mascota),
  });
  return res.json();
}

// Eliminar mascota
export async function deleteMascota(id) {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });
  return res.json();
}
