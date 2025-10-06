// src/features/pagos/services/pagosService.js
import * as pagosApi from "../api/pagosApi";
import axios from "axios";
const API_URL = "http://localhost:3000/api/pagos";
export const registrarPago = async (pagoData) => {
  try {
    const nuevoPago = await pagosApi.crearPago(pagoData);
    return nuevoPago;
  } catch (error) {
    console.error("Error al registrar el pago:", error);
    throw error;
  }
};

export const listarPagos = async () => {
  try {
    return await pagosApi.obtenerPagos();
  } catch (error) {
    console.error("Error al obtener pagos:", error);
    throw error;
  }
};

export const eliminarPagoPorId = async (idPago) => {
  try {
    await pagosApi.eliminarPago(idPago);
  } catch (error) {
    console.error("Error al eliminar el pago:", error);
    throw error;
  }
};

export const createPago = async (pago) => {
  try {
    const response = await axios.post(API_URL, pago);
    return response.data;
  } catch (error) {
    console.error("Error al procesar el pago:", error);
    throw error;
  }
};

// (opcional) otros servicios relacionados con pagos
export const getPagos = async () => {
  const res = await fetch(API_URL);
  return await res.json();
};
