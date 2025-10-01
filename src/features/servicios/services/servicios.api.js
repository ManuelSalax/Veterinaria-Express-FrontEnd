import api from "../../../services/api";

export const createServicio = async (data) => (await api.post("/servicios", data)).data;
export const getServicios = async () => (await api.get("/servicios")).data;
export const getServicioById = async (id) => (await api.get(`/servicios/${id}`)).data;
export const updateServicio = async (id, data) => (await api.put(`/servicios/${id}`, data)).data;
export const deleteServicio = async (id) => (await api.delete(`/servicios/${id}`)).data;