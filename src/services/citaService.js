import api from './api';

export const getAllCitas = () => api.get('/citas');

export const getCitaById = (id) => api.get(`/citas/${id}`);

export const createCita = (cita) => api.post('/citas', cita);

export const updateCita = (id, cita) => api.put(`/citas/${id}`, cita);

export const deleteCita = (id) => api.delete(`/citas/${id}`);

export const getCitasByPaciente = (idPaciente) => api.get(`/citas/paciente/${idPaciente}`);

export const getCitasByMedico = (idMedico) => api.get(`/citas/medico/${idMedico}`);

export const getCitasByEstado = (estado) => api.get(`/citas/estado/${estado}`);

export const getCitasByFecha = (fecha) => api.get(`/citas/fecha/${fecha}`);