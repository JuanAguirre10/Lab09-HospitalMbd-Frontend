import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import PrivateRoute from './utils/PrivateRoute';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import PacientesPage from './pages/PacientesPage';
import MedicosPage from './pages/MedicosPage';
import CitasPage from './pages/CitasPage';
import ConsultasPage from './pages/ConsultasPage';
import HospitalizacionPage from './pages/HospitalizacionPage';
import HabitacionesPage from './pages/HabitacionesPage';
import FacturacionPage from './pages/FacturacionPage';
import UsuariosPage from './pages/UsuariosPage';
import NotFound from './pages/NotFound';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          
          <Route path="/dashboard" element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          } />

          <Route path="/pacientes" element={
            <PrivateRoute>
              <PacientesPage />
            </PrivateRoute>
          } />

          <Route path="/medicos" element={
            <PrivateRoute>
              <MedicosPage />
            </PrivateRoute>
          } />

          <Route path="/citas" element={
            <PrivateRoute>
              <CitasPage />
            </PrivateRoute>
          } />

          <Route path="/consultas" element={
            <PrivateRoute>
              <ConsultasPage />
            </PrivateRoute>
          } />

          <Route path="/hospitalizacion" element={
            <PrivateRoute>
              <HospitalizacionPage />
            </PrivateRoute>
          } />

          <Route path="/habitaciones" element={
            <PrivateRoute>
              <HabitacionesPage />
            </PrivateRoute>
          } />

          <Route path="/facturacion" element={
            <PrivateRoute>
              <FacturacionPage />
            </PrivateRoute>
          } />

          <Route path="/usuarios" element={
            <PrivateRoute>
              <UsuariosPage />
            </PrivateRoute>
          } />

          <Route path="/" element={<Navigate to="/dashboard" />} />
          
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;