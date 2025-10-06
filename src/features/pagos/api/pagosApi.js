
import axios from "axios";

const API_URL = "http://localhost:3000/api/pagos";

export const crearPago = async (pagoData) => {
  const response = await axios.post(API_URL, pagoData);
  return response.data;
};

export const obtenerPagos = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const obtenerPagoPorId = async (idPago) => {
  const response = await axios.get(`${API_URL}/${idPago}`);
  return response.data;
};

export const actualizarPago = async (idPago, pagoData) => {
  const response = await axios.put(`${API_URL}/${idPago}`, pagoData);
  return response.data;
};

export const eliminarPago = async (idPago) => {
  const response = await axios.delete(`${API_URL}/${idPago}`);
  return response.data;
};
