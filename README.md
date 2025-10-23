# 🏥 Sistema de Gestión Hospitalaria - Frontend

Sistema web completo para la gestión integral de un hospital, desarrollado con React, Material-UI y diseño moderno.

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![React](https://img.shields.io/badge/React-18.3.1-61dafb.svg)
![Material-UI](https://img.shields.io/badge/Material--UI-6.3.0-0081cb.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)

---

## 📋 Tabla de Contenidos

- [Características](#características)
- [Tecnologías](#tecnologías)
- [Requisitos Previos](#requisitos-previos)
- [Instalación](#instalación)
- [Configuración](#configuración)
- [Ejecución](#ejecución)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Módulos del Sistema](#módulos-del-sistema)
- [Funcionalidades](#funcionalidades)
- [API Backend](#api-backend)
- [Credenciales de Prueba](#credenciales-de-prueba)
- [Scripts Disponibles](#scripts-disponibles)
- [Buenas Prácticas](#buenas-prácticas)
- [Solución de Problemas](#solución-de-problemas)
- [Contribución](#contribución)
- [Licencia](#licencia)

---

## ✨ Características

- 🎨 **Diseño Moderno**: Interfaz intuitiva y atractiva con Material-UI
- 🔐 **Autenticación Segura**: Sistema de login con JWT
- 📱 **Responsive Design**: Adaptable a dispositivos móviles y tablets
- 🚀 **Navegación Fluida**: React Router para navegación SPA
- 🎯 **CRUD Completo**: Operaciones completas en todos los módulos
- 🔍 **Búsqueda y Filtros**: Sistema de búsqueda avanzada en tiempo real
- 📊 **Dashboard Interactivo**: Estadísticas y métricas en tiempo real
- 💫 **Animaciones Suaves**: Transiciones y efectos hover profesionales
- 🎨 **Tema Consistente**: Paleta de colores médica profesional
- 🔔 **Notificaciones Toast**: Feedback inmediato de acciones
- 📋 **Formularios Validados**: Validación completa de datos
- 🏥 **10 Módulos Completos**: Sistema integral hospitalario

---

## 🛠️ Tecnologías

### Core
- **React** 18.3.1 - Biblioteca de interfaz de usuario
- **React Router DOM** 7.1.1 - Enrutamiento SPA
- **Material-UI (MUI)** 6.3.0 - Framework de componentes UI
- **Axios** 1.7.9 - Cliente HTTP para API REST

### Utilidades
- **React Toastify** 10.0.6 - Notificaciones toast elegantes
- **Emotion** - Librería CSS-in-JS para estilos dinámicos
- **@mui/icons-material** - Iconos de Material Design

### Desarrollo
- **Vite** 6.0.5 - Build tool ultrarrápido
- **ESLint** 9.17.0 - Linter de código JavaScript/React
- **@vitejs/plugin-react** - Plugin oficial de Vite para React

---

## 📦 Requisitos Previos

Antes de comenzar, asegúrate de tener instalado:

- **Node.js** >= 16.0.0 ([Descargar](https://nodejs.org/))
- **npm** >= 8.0.0 o **yarn** >= 1.22.0
- **Backend del sistema** corriendo en `http://localhost:8080`
- **MongoDB** para la base de datos (backend)
- **Git** para control de versiones

---

## 🚀 Instalación

### 1. Clonar el repositorio

```bash
git clone https://github.com/tu-usuario/hospital-frontend.git
cd hospital-frontend
```

### 2. Instalar dependencias

Con npm:
```bash
npm install
```

O con yarn:
```bash
yarn install
```

### 3. Verificar instalación

```bash
npm list --depth=0
```

---

## ⚙️ Configuración

### Variables de Entorno

Crea un archivo `.env` en la raíz del proyecto:

```env
# URL del Backend
VITE_API_URL=http://localhost:8080/api

# Puerto del Frontend (opcional)
VITE_PORT=5173

# Modo de desarrollo
VITE_MODE=development
```

### Configuración de API

El archivo `src/services/api.js` contiene la configuración base de Axios:

```javascript
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api';

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Interceptor para agregar token JWT
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default api;
```

---

## 🎮 Ejecución

### Modo Desarrollo

```bash
npm run dev
```

La aplicación estará disponible en: **http://localhost:5173**

### Modo Producción

#### 1. Build para producción

```bash
npm run build
```

Los archivos optimizados se generarán en la carpeta `dist/`

#### 2. Preview del build

```bash
npm run preview
```

#### 3. Deploy

Puedes deployar la carpeta `dist/` en cualquier servidor web estático:
- **Vercel**
- **Netlify**
- **GitHub Pages**
- **AWS S3**
- **Nginx**

### Linting

```bash
npm run lint
```

---

## 📁 Estructura del Proyecto

```
hospital-frontend/
├── public/                      # Archivos estáticos
│   └── vite.svg
├── src/
│   ├── components/              # Componentes reutilizables
│   │   ├── citas/              # Componentes de Citas
│   │   │   ├── CitaTable.jsx
│   │   │   ├── CitaForm.jsx
│   │   │   └── CitaDetail.jsx
│   │   ├── consultas/          # Componentes de Consultas
│   │   │   ├── ConsultaTable.jsx
│   │   │   ├── ConsultaForm.jsx
│   │   │   └── ConsultaDetail.jsx
│   │   ├── diagnosticos/       # Componentes de Diagnósticos
│   │   │   ├── DiagnosticoTable.jsx
│   │   │   ├── DiagnosticoForm.jsx
│   │   │   ├── RecetaTable.jsx
│   │   │   ├── RecetaForm.jsx
│   │   │   ├── DetalleRecetaTable.jsx
│   │   │   └── DetalleRecetaForm.jsx
│   │   ├── facturacion/        # Componentes de Facturación
│   │   │   ├── FacturaTable.jsx
│   │   │   ├── FacturaForm.jsx
│   │   │   └── FacturaDetail.jsx
│   │   ├── habitaciones/       # Componentes de Habitaciones
│   │   │   ├── HabitacionTable.jsx
│   │   │   └── HabitacionForm.jsx
│   │   ├── hospitalizacion/    # Componentes de Hospitalización
│   │   │   ├── HospitalizacionTable.jsx
│   │   │   ├── HospitalizacionForm.jsx
│   │   │   └── HospitalizacionDetail.jsx
│   │   ├── layout/             # Layout y navegación
│   │   │   ├── Layout.jsx
│   │   │   └── Sidebar.jsx
│   │   ├── medicos/            # Componentes de Médicos
│   │   │   ├── MedicoTable.jsx
│   │   │   ├── MedicoForm.jsx
│   │   │   └── MedicoDetail.jsx
│   │   ├── pacientes/          # Componentes de Pacientes
│   │   │   ├── PacienteTable.jsx
│   │   │   ├── PacienteForm.jsx
│   │   │   └── PacienteDetail.jsx
│   │   └── usuarios/           # Componentes de Usuarios
│   │       ├── UsuarioTable.jsx
│   │       ├── UsuarioForm.jsx
│   │       └── UsuarioDetail.jsx
│   ├── context/                # Context API de React
│   │   └── AuthContext.jsx     # Contexto de autenticación
│   ├── pages/                  # Páginas principales
│   │   ├── Login.jsx           # Página de inicio de sesión
│   │   ├── Dashboard.jsx       # Panel de control
│   │   ├── PacientesPage.jsx   # Gestión de pacientes
│   │   ├── MedicosPage.jsx     # Gestión de médicos
│   │   ├── CitasPage.jsx       # Gestión de citas
│   │   ├── ConsultasPage.jsx   # Gestión de consultas
│   │   ├── HospitalizacionPage.jsx  # Gestión de hospitalización
│   │   ├── HabitacionesPage.jsx     # Gestión de habitaciones
│   │   ├── FacturacionPage.jsx      # Gestión de facturación
│   │   ├── DiagnosticosPage.jsx     # Diagnósticos y recetas
│   │   ├── UsuariosPage.jsx    # Gestión de usuarios
│   │   └── NotFound.jsx        # Página 404
│   ├── services/               # Servicios de API REST
│   │   ├── api.js              # Configuración base de Axios
│   │   ├── authService.js      # Servicios de autenticación
│   │   ├── pacienteService.js  # Servicios de pacientes
│   │   ├── medicoService.js    # Servicios de médicos
│   │   ├── citaService.js      # Servicios de citas
│   │   ├── consultaService.js  # Servicios de consultas
│   │   ├── hospitalizacionService.js
│   │   ├── habitacionService.js
│   │   ├── facturaService.js
│   │   ├── diagnosticoService.js
│   │   ├── recetaService.js
│   │   ├── detalleRecetaService.js
│   │   └── usuarioService.js
│   ├── utils/                  # Utilidades y helpers
│   │   └── PrivateRoute.jsx    # Componente de ruta protegida
│   ├── App.jsx                 # Componente principal de la app
│   ├── main.jsx                # Punto de entrada de React
│   ├── index.css               # Estilos globales
│   └── theme.js                # Configuración de tema MUI
├── .env                        # Variables de entorno (crear)
├── .env.example                # Ejemplo de variables de entorno
├── .gitignore                  # Archivos ignorados por Git
├── eslint.config.js            # Configuración de ESLint
├── index.html                  # HTML principal
├── package.json                # Dependencias del proyecto
├── package-lock.json           # Lock de dependencias
├── vite.config.js              # Configuración de Vite
└── README.md                   # Este archivo
```

---

## 🏥 Módulos del Sistema

### 1. 🔐 Autenticación
**Ruta:** `/login`

- Login con usuario y contraseña
- Autenticación JWT
- Protección de rutas privadas
- Gestión de sesión con localStorage
- Logout seguro
- Redirección automática

**Características:**
- Validación de credenciales
- Token JWT en headers
- Interceptor de Axios
- Context API para estado global

---

### 2. 📊 Dashboard
**Ruta:** `/dashboard`

- **Estadísticas en Tiempo Real:**
  - Total de pacientes registrados
  - Total de médicos activos
  - Citas programadas y del día
  - Consultas realizadas
  
- **Actividad del Día:**
  - Citas de hoy
  - Citas programadas
  - Citas atendidas
  - Citas canceladas

- **Hospitalización:**
  - Pacientes hospitalizados actualmente
  - Total de hospitalizaciones

- **Resumen Financiero:**
  - Total facturado
  - Facturas pagadas
  - Facturas pendientes
  - Barra de progreso de pagos

**Características:**
- Cards con animaciones hover
- Colores distintivos por módulo
- Iconos de Material-UI
- Datos actualizados en tiempo real

---

### 3. 👥 Pacientes
**Ruta:** `/pacientes`

**Funcionalidades:**
- ✅ Crear nuevo paciente
- ✅ Listar todos los pacientes
- ✅ Buscar por nombre, DNI o email
- ✅ Editar información del paciente
- ✅ Eliminar paciente
- ✅ Ver detalles completos

**Campos:**
- Nombres y apellidos
- DNI
- Fecha de nacimiento
- Género
- Dirección
- Teléfono
- Email
- Tipo de sangre

**Características:**
- Tabla con paginación
- Búsqueda en tiempo real
- Modal de formulario
- Modal de detalle
- Validación de campos
- Chips de género y tipo de sangre

---

### 4. 👨‍⚕️ Médicos
**Ruta:** `/medicos`

**Funcionalidades:**
- ✅ Registrar médico
- ✅ Listar médicos
- ✅ Buscar por nombre o especialidad
- ✅ Editar datos del médico
- ✅ Eliminar médico
- ✅ Ver perfil completo

**Campos:**
- Nombres y apellidos
- DNI
- Especialidad
- Número de colegiatura
- Teléfono
- Email
- Horario de atención

**Características:**
- Filtro por especialidad
- Chips de especialidad con colores
- Cards de perfil médico
- Información de contacto

---

### 5. 📅 Citas Médicas
**Ruta:** `/citas`

**Funcionalidades:**
- ✅ Programar cita
- ✅ Listar citas
- ✅ Buscar por paciente, médico o motivo
- ✅ Filtrar por estado
- ✅ Editar cita
- ✅ Cancelar cita
- ✅ Ver detalle con nombres reales

**Campos:**
- Paciente (autocompletado)
- Médico (autocompletado)
- Fecha
- Hora
- Motivo de la cita
- Estado (programada, atendida, cancelada)

**Características:**
- Selector de fecha con calendario
- Autocomplete para paciente y médico
- Estados con colores distintivos
- Lookup de nombres en tiempo real

---

### 6. 🩺 Consultas Médicas
**Ruta:** `/consultas`

**Funcionalidades:**
- ✅ Registrar consulta
- ✅ Listar consultas
- ✅ Buscar consultas
- ✅ Editar consulta
- ✅ Eliminar consulta
- ✅ Ver detalle completo con diagnósticos y recetas

**Campos:**
- Paciente
- Médico
- Fecha y hora
- Motivo de consulta
- Observaciones

**Detalle Ampliado:**
- Información básica de la consulta
- Diagnósticos asociados (con tipo)
- Recetas médicas con indicaciones
- Detalle de medicamentos (dosis, frecuencia, duración)

**Características:**
- Integración con diagnósticos
- Integración con recetas
- Vista enriquecida de detalles
- Búsqueda avanzada

---

### 7. 🏥 Hospitalización
**Ruta:** `/hospitalizacion`

**Funcionalidades:**
- ✅ Registrar ingreso
- ✅ Listar hospitalizaciones
- ✅ Buscar por paciente o habitación
- ✅ Editar hospitalización
- ✅ Dar de alta
- ✅ Ver detalle completo

**Campos:**
- Paciente
- Habitación (con número real)
- Fecha de ingreso
- Fecha de alta (opcional)
- Diagnóstico de ingreso
- Estado (activo, alta, transferido)

**Características:**
- Muestra número real de habitación
- Muestra nombre real del paciente
- Chip "En curso" si no hay fecha de alta
- Integración con módulo de habitaciones

---

### 8. 🛏️ Habitaciones
**Ruta:** `/habitaciones`

**Funcionalidades:**
- ✅ Crear habitación
- ✅ Listar habitaciones
- ✅ Buscar por número o tipo
- ✅ Filtrar por estado
- ✅ Editar habitación
- ✅ Eliminar habitación

**Campos:**
- Número de habitación
- Tipo (Individual, Doble, UCI, Pediatría, Emergencia)
- Estado (Disponible, Ocupada, Mantenimiento)

**Características:**
- Chips con colores por tipo
- Chips con colores por estado
- Filtro de estado en tiempo real
- Numeración personalizable

---

### 9. 💊 Diagnósticos y Recetas
**Ruta:** `/diagnosticos`

**Sistema Integrado con 3 Tabs:**

#### Tab 1: Diagnósticos 🩺
- ✅ Registrar diagnóstico
- ✅ Listar diagnósticos
- ✅ Buscar por descripción o tipo
- ✅ Editar diagnóstico
- ✅ Eliminar diagnóstico

**Campos:**
- Consulta asociada
- Descripción del diagnóstico
- Tipo (Principal, Secundario, Diferencial)

#### Tab 2: Recetas Médicas 💊
- ✅ Crear receta
- ✅ Listar recetas
- ✅ Buscar por indicaciones
- ✅ Editar receta
- ✅ Eliminar receta

**Campos:**
- Consulta asociada
- Indicaciones generales

#### Tab 3: Detalle de Medicamentos 📋
- ✅ Agregar medicamento a receta
- ✅ Listar medicamentos
- ✅ Buscar por nombre
- ✅ Editar medicamento
- ✅ Eliminar medicamento

**Campos:**
- Receta asociada
- Nombre del medicamento
- Dosis
- Frecuencia
- Duración del tratamiento

**Características:**
- Navegación por tabs
- Botón dinámico según tab activo
- Colores distintivos por tab
- Relaciones entre entidades
- Búsqueda independiente por tab

---

### 10. 💰 Facturación
**Ruta:** `/facturacion`

**Funcionalidades:**
- ✅ Emitir factura
- ✅ Listar facturas
- ✅ Buscar por paciente o número
- ✅ Filtrar por estado
- ✅ Editar factura
- ✅ Anular factura
- ✅ Ver detalle completo

**Campos:**
- Número de factura (auto-generado)
- Paciente
- Fecha de emisión
- Monto total
- Estado (Pendiente, Pagada, Anulada)
- Método de pago

**Características:**
- Número de factura único
- Muestra nombre real del paciente
- Estados con colores distintivos
- Cálculo automático de totales
- Resumen financiero en dashboard

---

### 11. 👤 Usuarios
**Ruta:** `/usuarios`

**Funcionalidades:**
- ✅ Crear usuario
- ✅ Listar usuarios
- ✅ Buscar por username o email
- ✅ Filtrar por rol
- ✅ Editar usuario
- ✅ Eliminar usuario
- ✅ Ver detalle

**Campos:**
- Nombre de usuario (username)
- Email
- Contraseña (encriptada)
- Rol (Admin, Médico, Recepcionista)
- Estado (Activo, Inactivo)

**Características:**
- Control de acceso por rol
- Contraseña opcional al editar
- Chips de rol con colores
- Estados activo/inactivo
- Avatares con iniciales

---

## 🎯 Funcionalidades Generales

### CRUD Completo
- ✅ **Create (Crear)**: Formularios con validación
- ✅ **Read (Leer)**: Tablas con datos en tiempo real
- ✅ **Update (Actualizar)**: Edición de registros
- ✅ **Delete (Eliminar)**: Eliminación con confirmación

### Búsqueda y Filtros
- 🔍 Búsqueda en tiempo real
- 📋 Filtros por estado, tipo, fecha
- 🎯 Autocompletado inteligente
- 🔄 Actualización dinámica de resultados

### Interfaz de Usuario
- 🎨 Diseño moderno con Material-UI
- 💫 Animaciones suaves en hover
- 📱 100% responsive
- 🎯 Navegación intuitiva con sidebar
- 🔔 Notificaciones toast elegantes
- 🎭 Modales para formularios y detalles

### Validación
- ✅ Campos requeridos
- ✅ Formato de email
- ✅ Formato de fecha
- ✅ Números positivos
- ✅ Longitud mínima/máxima
- ✅ Validación en tiempo real

### Tablas
- 📊 Columnas ordenables
- 📄 Datos paginados
- 🔍 Búsqueda integrada
- 🎨 Chips con colores
- 👁️ Ver detalles
- ✏️ Editar inline
- 🗑️ Eliminar con confirmación

### Formularios
- 📝 Campos con validación
- 🔄 Autocomplete para relaciones
- 📅 Date pickers
- ⏰ Time pickers
- 📋 Dropdowns
- 🔘 Radio buttons
- ☑️ Checkboxes
- 🎚️ Switches

---

## 🔌 API Backend

### Endpoints Principales

#### Autenticación
```
POST   /api/auth/login          - Iniciar sesión
POST   /api/auth/logout         - Cerrar sesión
GET    /api/auth/me             - Usuario actual
```

#### Pacientes
```
GET    /api/pacientes           - Listar todos
GET    /api/pacientes/{id}      - Obtener por ID
POST   /api/pacientes           - Crear nuevo
PUT    /api/pacientes/{id}      - Actualizar
DELETE /api/pacientes/{id}      - Eliminar
```

#### Médicos
```
GET    /api/medicos             - Listar todos
GET    /api/medicos/{id}        - Obtener por ID
POST   /api/medicos             - Crear nuevo
PUT    /api/medicos/{id}        - Actualizar
DELETE /api/medicos/{id}        - Eliminar
GET    /api/medicos/especialidad/{esp} - Por especialidad
```

#### Citas
```
GET    /api/citas               - Listar todas
GET    /api/citas/{id}          - Obtener por ID
POST   /api/citas               - Crear nueva
PUT    /api/citas/{id}          - Actualizar
DELETE /api/citas/{id}          - Eliminar
GET    /api/citas/estado/{estado} - Por estado
GET    /api/citas/paciente/{id} - Por paciente
GET    /api/citas/medico/{id}   - Por médico
```

#### Consultas
```
GET    /api/consultas           - Listar todas
GET    /api/consultas/{id}      - Obtener por ID
POST   /api/consultas           - Crear nueva
PUT    /api/consultas/{id}      - Actualizar
DELETE /api/consultas/{id}      - Eliminar
GET    /api/consultas/paciente/{id} - Por paciente
GET    /api/consultas/medico/{id}   - Por médico
```

#### Hospitalización
```
GET    /api/hospitalizaciones   - Listar todas
GET    /api/hospitalizaciones/{id} - Obtener por ID
POST   /api/hospitalizaciones   - Crear nueva
PUT    /api/hospitalizaciones/{id} - Actualizar
DELETE /api/hospitalizaciones/{id} - Eliminar
GET    /api/hospitalizaciones/paciente/{id} - Por paciente
GET    /api/hospitalizaciones/estado/{estado} - Por estado
```

#### Habitaciones
```
GET    /api/habitaciones        - Listar todas
GET    /api/habitaciones/{id}   - Obtener por ID
POST   /api/habitaciones        - Crear nueva
PUT    /api/habitaciones/{id}   - Actualizar
DELETE /api/habitaciones/{id}   - Eliminar
GET    /api/habitaciones/estado/{estado} - Por estado
GET    /api/habitaciones/tipo/{tipo} - Por tipo
GET    /api/habitaciones/numero/{numero} - Por número
```

#### Diagnósticos
```
GET    /api/diagnosticos        - Listar todos
GET    /api/diagnosticos/{id}   - Obtener por ID
POST   /api/diagnosticos        - Crear nuevo
PUT    /api/diagnosticos/{id}   - Actualizar
DELETE /api/diagnosticos/{id}   - Eliminar
GET    /api/diagnosticos/consulta/{id} - Por consulta
```

#### Recetas
```
GET    /api/recetas             - Listar todas
GET    /api/recetas/{id}        - Obtener por ID
POST   /api/recetas             - Crear nueva
PUT    /api/recetas/{id}        - Actualizar
DELETE /api/recetas/{id}        - Eliminar
GET    /api/recetas/consulta/{id} - Por consulta
```

#### Detalle Recetas
```
GET    /api/detalle-recetas     - Listar todos
GET    /api/detalle-recetas/{id} - Obtener por ID
POST   /api/detalle-recetas     - Crear nuevo
PUT    /api/detalle-recetas/{id} - Actualizar
DELETE /api/detalle-recetas/{id} - Eliminar
GET    /api/detalle-recetas/receta/{id} - Por receta
```

#### Facturación
```
GET    /api/facturas            - Listar todas
GET    /api/facturas/{id}       - Obtener por ID
POST   /api/facturas            - Crear nueva
PUT    /api/facturas/{id}       - Actualizar
DELETE /api/facturas/{id}       - Eliminar
GET    /api/facturas/paciente/{id} - Por paciente
GET    /api/facturas/estado/{estado} - Por estado
```

#### Usuarios
```
GET    /api/usuarios            - Listar todos
GET    /api/usuarios/{id}       - Obtener por ID
POST   /api/usuarios            - Crear nuevo
PUT    /api/usuarios/{id}       - Actualizar
DELETE /api/usuarios/{id}       - Eliminar
```

---

## 🔑 Credenciales de Prueba

### Administrador
```
Usuario: admin
Contraseña: admin123
Rol: Administrador
```

### Médico
```
Usuario: medico1
Contraseña: medico123
Rol: Médico
```

### Recepcionista
```
Usuario: recepcion1
Contraseña: recep123
Rol: Recepcionista
```

> **Nota:** Cambiar estas credenciales en producción

---

## 📜 Scripts Disponibles

### Desarrollo
```bash
npm run dev          # Iniciar servidor de desarrollo
npm run build        # Build de producción
npm run preview      # Preview del build
npm run lint         # Ejecutar ESLint
```

### Instalación
```bash
npm install          # Instalar dependencias
npm ci               # Instalación limpia
npm update           # Actualizar dependencias
```

### Testing (próximamente)
```bash
npm test             # Ejecutar tests
npm run test:watch   # Tests en modo watch
npm run test:coverage # Cobertura de tests
```

---

## 🎨 Paleta de Colores

### Colores Principales
```
Primario (Pacientes):    #1976d2  - Azul
Secundario (Médicos):    #9c27b0  - Morado
Info (Citas):            #0288d1  - Azul claro
Warning (Consultas):     #ed6c02  - Naranja
Error (Hospitalización): #d32f2f  - Rojo
Success (Finanzas):      #2e7d32  - Verde
```

### Tema Material-UI
```javascript
const theme = createTheme({
    palette: {
        primary: { main: '#1976d2' },
        secondary: { main: '#9c27b0' },
        error: { main: '#d32f2f' },
        warning: { main: '#ed6c02' },
        info: { main: '#0288d1' },
        success: { main: '#2e7d32' },
    },
    typography: {
        fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    },
});
```

---

## 💡 Buenas Prácticas

### Código
- ✅ Componentes funcionales con Hooks
- ✅ Props destructuring
- ✅ Named exports para componentes
- ✅ Código limpio y comentado
- ✅ Separación de responsabilidades
- ✅ DRY (Don't Repeat Yourself)

### React
- ✅ useState para estado local
- ✅ useEffect para efectos secundarios
- ✅ useContext para estado global
- ✅ Custom hooks cuando sea necesario
- ✅ Memoización con useMemo/useCallback
- ✅ Lazy loading de rutas

### Estilos
- ✅ Material-UI sx prop
- ✅ Tema consistente
- ✅ Responsive design
- ✅ Colores semánticos
- ✅ Spacing consistente

### API
- ✅ Manejo de errores con try-catch
- ✅ Loading states
- ✅ Toast notifications
- ✅ Interceptores de Axios
- ✅ Headers con JWT

### Git
```bash
# Commits descriptivos
git commit -m "feat: agregar módulo de pacientes"
git commit -m "fix: corregir búsqueda en citas"
git commit -m "style: mejorar diseño de dashboard"
git commit -m "refactor: optimizar tabla de médicos"
```

---

## 🔧 Solución de Problemas

### Error: Cannot connect to backend
**Solución:**
1. Verificar que el backend esté corriendo
2. Revisar la URL en `.env`
3. Verificar CORS en el backend

### Error: Token expired
**Solución:**
1. Hacer logout
2. Volver a iniciar sesión
3. El token se renovará automáticamente

### Error: Module not found
**Solución:**
```bash
rm -rf node_modules package-lock.json
npm install
```

### Error: Port already in use
**Solución:**
```bash
# En Windows
netstat -ano | findstr :5173
taskkill /PID <PID> /F

# En Linux/Mac
lsof -ti:5173 | xargs kill -9
```

### Build lento
**Solución:**
```bash
# Limpiar cache
npm run build -- --clean

# Actualizar Vite
npm install vite@latest
```

---




## 👨‍💻 Autores

- **Juan Aguirre** - *Desarrollo Completo* - [GitHub](https://github.com/JuanAguirre10)

---

## 🙏 Agradecimientos

- [React](https://react.dev/) - Librería UI
- [Material-UI](https://mui.com/) - Componentes UI
- [Vite](https://vitejs.dev/) - Build tool
- [Axios](https://axios-http.com/) - Cliente HTTP
- [React Router](https://reactrouter.com/) - Enrutamiento
- [React Toastify](https://fkhadra.github.io/react-toastify/) - Notificaciones


---

## 🔗 Links Útiles

- [Documentación de React](https://react.dev/)
- [Documentación de Material-UI](https://mui.com/material-ui/getting-started/)
- [Documentación de Vite](https://vitejs.dev/guide/)
- [Documentación de Axios](https://axios-http.com/docs/intro)
- [Backend del Sistema](https://github.com/tu-usuario/hospital-backend)

---

**⭐ Si te gustó este proyecto, no olvides darle una estrella en GitHub!**
