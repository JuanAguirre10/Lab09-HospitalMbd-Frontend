import api from './api';

export const getAllHospitalizaciones = () => api.get('/hospitalizaciones');

export const getHospitalizacionById = (id) => api.get(`/hospitalizaciones/${id}`);

export const createHospitalizacion = (hospitalizacion) => api.post('/hospitalizaciones', hospitalizacion);

export const updateHospitalizacion = (id, hospitalizacion) => api.put(`/hospitalizaciones/${id}`, hospitalizacion);

export const deleteHospitalizacion = (id) => api.delete(`/hospitalizaciones/${id}`);

export const getHospitalizacionesByPaciente = (idPaciente) => api.get(`/hospitalizaciones/paciente/${idPaciente}`);

export const getHospitalizacionesByHabitacion = (idHabitacion) => api.get(`/hospitalizaciones/habitacion/${idHabitacion}`);

export const getHospitalizacionesActivas = () => api.get('/hospitalizaciones/activas');