import api from "../../../services/api";

export const createCita = async (data) => (await api.post("/citas", data)).data;
export const getCitas = async () => (await api.get("/citas")).data;
export const getCitaById = async (id) => (await api.get(`/citas/${id}`)).data;
export const updateCita = async (id, data) => (await api.put(`/citas/${id}`, data)).data;
export const deleteCita = async (id) => (await api.delete(`/citas/${id}`)).data;