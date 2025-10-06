// src/features/productos/api/productosApi.js
const API_URL = "http://localhost:3000/api/productos";

export async function getProductos() {
  const res = await fetch(API_URL);
  if (!res.ok) throw new Error("Error al obtener productos");
  return res.json();
}

export async function createProducto(producto) {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(producto),
  });
  return res.json();
}

export async function getProductoById(id) {
  const res = await fetch(`${API_URL}/${id}`);
  return res.json();
}

export async function updateProducto(id, producto) {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(producto),
  });
  return res.json();
}

export async function deleteProducto(id) {
  const res = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
  return res.json();
}
