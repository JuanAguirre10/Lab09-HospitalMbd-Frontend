import api from './api';

export const getAllFacturas = () => api.get('/facturas');

export const getFacturaById = (id) => api.get(`/facturas/${id}`);

export const createFactura = (factura) => api.post('/facturas', factura);

export const updateFactura = (id, factura) => api.put(`/facturas/${id}`, factura);

export const deleteFactura = (id) => api.delete(`/facturas/${id}`);

export const getFacturasByPaciente = (idPaciente) => api.get(`/facturas/paciente/${idPaciente}`);

export const getFacturasByEstado = (estado) => api.get(`/facturas/estado/${estado}`);