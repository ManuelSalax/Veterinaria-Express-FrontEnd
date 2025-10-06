// src/features/productos/services/productosService.js
import * as productosApi from "../api/productosApi";

export const getProductos = async () => {
  try {
    return await productosApi.getProductos();
  } catch (error) {
    console.error("Error al obtener productos:", error);
    throw error;
  }
};

export const getProductoById = async (id) => {
  const res = await fetch(`http://localhost:3000/api/productos/${id}`);
  if (!res.ok) throw new Error("Error al obtener producto");
  return res.json();
};

export const createProducto = async (producto) => {
  try {
    // Ejemplo de validación antes de enviar
    if (!producto.nombre || !producto.precio) {
      throw new Error("El producto debe tener nombre y precio");
    }
    return await productosApi.createProducto(producto);
  } catch (error) {
    console.error("Error al crear producto:", error);
    throw error;
  }
};

export const updateProducto = async (id, producto) => {
  try {
    return await productosApi.updateProducto(id, producto);
  } catch (error) {
    console.error("Error al actualizar producto:", error);
    throw error;
  }
};

export const deleteProducto = async (id) => {
  try {
    return await productosApi.deleteProducto(id);
  } catch (error) {
    console.error("Error al eliminar producto:", error);
    throw error;
  }
};
