import api from './api';

export const getAllUsuarios = () => api.get('/usuarios');

export const getUsuarioById = (id) => api.get(`/usuarios/${id}`);

export const createUsuario = (usuario) => api.post('/usuarios', usuario);

export const updateUsuario = (id, usuario) => api.put(`/usuarios/${id}`, usuario);

export const deleteUsuario = (id) => api.delete(`/usuarios/${id}`);

export const getUsuarioByUsername = (username) => api.get(`/usuarios/username/${username}`);