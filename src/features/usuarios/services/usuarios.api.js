import api from "../../../services/api";

// Crear usuario
export const createUsuario = async (data) => (await api.post("/usuarios", data)).data;

// Listar usuarios
export const getUsuarios = async () => (await api.get("/usuarios")).data;

// Obtener usuario por ID
export const getUsuarioById = async (id) => (await api.get(`/usuarios/${id}`)).data;

// Actualizar usuario
export const updateUsuario = async (id, data) => (await api.put(`/usuarios/${id}`, data)).data;

// Eliminar usuario
export const deleteUsuario = async (id) => (await api.delete(`/usuarios/${id}`)).data;