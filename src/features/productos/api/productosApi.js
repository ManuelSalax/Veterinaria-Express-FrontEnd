const API_URL = "http://localhost:3000/api/productos";

// Listar productos
export async function getProductos() {
  const res = await fetch(API_URL);
  if (!res.ok) throw new Error("Error al obtener productos");
  return res.json();
}

// Crear producto
export async function createProducto(producto) {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(producto),
  });
  return res.json();
}

// Obtener producto por ID
export async function getProductoById(id) {
  const res = await fetch(`${API_URL}/${id}`);
  return res.json();
}

// Actualizar producto
export async function updateProducto(id, producto) {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(producto),
  });
  return res.json();
}

// Eliminar producto
export async function deleteProducto(id) {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });
  return res.json();
}
