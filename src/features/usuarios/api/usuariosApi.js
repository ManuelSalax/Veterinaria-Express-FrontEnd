// URL del backend para usuarios
const API_URL = "http://localhost:3000/api/usuarios";

// Listar todos los usuarios
export async function getUsuarios() {
  const res = await fetch(API_URL);
  if (!res.ok) {
    throw new Error("Error al obtener usuarios");
  }
  return res.json();
}

// Crear usuario
export async function createUsuario(usuario) {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(usuario),
  });
  return res.json();
}

// Obtener usuario por ID
export async function getUsuarioById(id) {
  const res = await fetch(`${API_URL}/${id}`);
  return res.json();
}

// Actualizar usuario
export async function updateUsuario(id, usuario) {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(usuario),
  });
  return res.json();
}

// Eliminar usuario
export async function deleteUsuario(id) {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });
  return res.json();
}
