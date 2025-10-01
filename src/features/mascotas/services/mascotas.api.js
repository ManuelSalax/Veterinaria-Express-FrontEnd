import api from "../../../services/api";

export const createMascota = async (data) => (await api.post("/mascotas", data)).data;
export const getMascotas = async () => (await api.get("/mascotas")).data;
export const getMascotaById = async (id) => (await api.get(`/mascotas/${id}`)).data;
export const updateMascota = async (id, data) => (await api.put(`/mascotas/${id}`, data)).data;
export const deleteMascota = async (id) => (await api.delete(`/mascotas/${id}`)).data;