import React, { useState, useEffect } from 'react';
import { 
    Box, 
    Button, 
    TextField, 
    InputAdornment,
    Chip,
    MenuItem,
    Alert,
} from '@mui/material';
import { 
    Add, 
    Search, 
} from '@mui/icons-material';
import Layout from '../components/layout/Layout';
import { getAllCitas, deleteCita } from '../services/citaService';
import { toast } from 'react-toastify';
import CitaTable from '../components/citas/CitaTable';
import CitaForm from '../components/citas/CitaForm';
import CitaDetail from '../components/citas/CitaDetail';

const CitasPage = () => {
    const [citas, setCitas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterEstado, setFilterEstado] = useState('todos');
    const [openForm, setOpenForm] = useState(false);
    const [openDetail, setOpenDetail] = useState(false);
    const [selectedCita, setSelectedCita] = useState(null);
    const [mode, setMode] = useState('create');

    useEffect(() => {
        loadCitas();
    }, []);

    const loadCitas = async () => {
        try {
            setLoading(true);
            setError(null);
            const response = await getAllCitas();
            setCitas(response.data || []);
        } catch (error) {
            console.error('Error completo:', error);
            setError('Error al cargar citas. El módulo está en desarrollo.');
            setCitas([]);
        } finally {
            setLoading(false);
        }
    };

    const handleCreate = () => {
        setMode('create');
        setSelectedCita(null);
        setOpenForm(true);
    };

    const handleEdit = (cita) => {
        setMode('edit');
        setSelectedCita(cita);
        setOpenForm(true);
    };

    const handleView = (cita) => {
        setSelectedCita(cita);
        setOpenDetail(true);
    };

    const handleDelete = async (id) => {
        if (window.confirm('¿Está seguro de eliminar esta cita?')) {
            try {
                await deleteCita(id);
                toast.success('Cita eliminada exitosamente');
                loadCitas();
            } catch (error) {
                toast.error('Error al eliminar cita');
            }
        }
    };

    const handleCloseForm = () => {
        setOpenForm(false);
        setSelectedCita(null);
    };

    const handleSuccess = () => {
        loadCitas();
        handleCloseForm();
    };

    const filteredCitas = citas.filter(c => {
        const matchSearch = 
            c.idPaciente?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            c.idMedico?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            c.motivo?.toLowerCase().includes(searchTerm.toLowerCase());
        
        const matchEstado = filterEstado === 'todos' || c.estado === filterEstado;
        
        return matchSearch && matchEstado;
    });

    return (
        <Layout>
            <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
                        <h2 style={{ margin: 0, fontSize: '2rem', fontWeight: 900 }}>Citas Médicas</h2>
                        <Chip 
                            label={`${filteredCitas.length} registros`} 
                            color="info" 
                            size="small"
                        />
                    </Box>
                    <p style={{ margin: 0, color: '#64748b', fontSize: '1.1rem' }}>
                        Gestión de citas médicas del sistema
                    </p>
                </Box>
                <Button
                    variant="contained"
                    startIcon={<Add />}
                    size="large"
                    onClick={handleCreate}
                    sx={{ 
                        px: 3,
                        py: 1.5,
                        fontWeight: 700,
                    }}
                >
                    Nueva Cita
                </Button>
            </Box>

            {error && (
                <Alert severity="warning" sx={{ mb: 3 }}>
                    {error}
                </Alert>
            )}

            <Box sx={{ mb: 3, display: 'flex', gap: 2 }}>
                <TextField
                    fullWidth
                    placeholder="Buscar por paciente, médico o motivo..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <Search />
                            </InputAdornment>
                        ),
                    }}
                    sx={{ maxWidth: 500 }}
                />
                <TextField
                    select
                    value={filterEstado}
                    onChange={(e) => setFilterEstado(e.target.value)}
                    sx={{ minWidth: 200 }}
                >
                    <MenuItem value="todos">Todos los estados</MenuItem>
                    <MenuItem value="programada">Programada</MenuItem>
                    <MenuItem value="atendida">Atendida</MenuItem>
                    <MenuItem value="cancelada">Cancelada</MenuItem>
                </TextField>
            </Box>

            <CitaTable
                citas={filteredCitas}
                loading={loading}
                onEdit={handleEdit}
                onDelete={handleDelete}
                onView={handleView}
            />

            <CitaForm
                open={openForm}
                onClose={handleCloseForm}
                onSuccess={handleSuccess}
                cita={selectedCita}
                mode={mode}
            />

            <CitaDetail
                open={openDetail}
                onClose={() => setOpenDetail(false)}
                cita={selectedCita}
            />
        </Layout>
    );
};

export default CitasPage;