import React, { useState, useEffect } from 'react';
import { 
    Box, 
    Button, 
    TextField, 
    InputAdornment,
    Chip,
    IconButton,
    Tooltip,
} from '@mui/material';
import { 
    Add, 
    Search, 
    Edit, 
    Delete, 
    Visibility,
    FilterList,
} from '@mui/icons-material';
import Layout from '../components/layout/Layout';
import { getAllPacientes, deletePaciente } from '../services/pacienteService';
import { toast } from 'react-toastify';
import PacienteTable from '../components/pacientes/PacienteTable';
import PacienteForm from '../components/pacientes/PacienteForm';
import PacienteDetail from '../components/pacientes/PacienteDetail';

const PacientesPage = () => {
    const [pacientes, setPacientes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [openForm, setOpenForm] = useState(false);
    const [openDetail, setOpenDetail] = useState(false);
    const [selectedPaciente, setSelectedPaciente] = useState(null);
    const [mode, setMode] = useState('create');

    useEffect(() => {
        loadPacientes();
    }, []);

    const loadPacientes = async () => {
        try {
            setLoading(true);
            const response = await getAllPacientes();
            setPacientes(response.data);
        } catch (error) {
            toast.error('Error al cargar pacientes');
        } finally {
            setLoading(false);
        }
    };

    const handleCreate = () => {
        setMode('create');
        setSelectedPaciente(null);
        setOpenForm(true);
    };

    const handleEdit = (paciente) => {
        setMode('edit');
        setSelectedPaciente(paciente);
        setOpenForm(true);
    };

    const handleView = (paciente) => {
        setSelectedPaciente(paciente);
        setOpenDetail(true);
    };

    const handleDelete = async (id) => {
        if (window.confirm('¿Está seguro de eliminar este paciente?')) {
            try {
                await deletePaciente(id);
                toast.success('Paciente eliminado exitosamente');
                loadPacientes();
            } catch (error) {
                toast.error('Error al eliminar paciente');
            }
        }
    };

    const handleCloseForm = () => {
        setOpenForm(false);
        setSelectedPaciente(null);
    };

    const handleSuccess = () => {
        loadPacientes();
        handleCloseForm();
    };

    const filteredPacientes = pacientes.filter(p => 
        p.nombres?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.apellidos?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.dni?.includes(searchTerm)
    );

    return (
        <Layout>
            <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
                        <h2 style={{ margin: 0, fontSize: '2rem', fontWeight: 900 }}>Pacientes</h2>
                        <Chip 
                            label={`${filteredPacientes.length} registros`} 
                            color="primary" 
                            size="small"
                        />
                    </Box>
                    <p style={{ margin: 0, color: '#64748b', fontSize: '1.1rem' }}>
                        Gestión de pacientes del sistema
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
                    Nuevo Paciente
                </Button>
            </Box>

            <Box sx={{ mb: 3, display: 'flex', gap: 2 }}>
                <TextField
                    fullWidth
                    placeholder="Buscar por nombre, apellido o DNI..."
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
                <Button
                    variant="outlined"
                    startIcon={<FilterList />}
                    sx={{ minWidth: 120 }}
                >
                    Filtros
                </Button>
            </Box>

            <PacienteTable
                pacientes={filteredPacientes}
                loading={loading}
                onEdit={handleEdit}
                onDelete={handleDelete}
                onView={handleView}
            />

            <PacienteForm
                open={openForm}
                onClose={handleCloseForm}
                onSuccess={handleSuccess}
                paciente={selectedPaciente}
                mode={mode}
            />

            <PacienteDetail
                open={openDetail}
                onClose={() => setOpenDetail(false)}
                paciente={selectedPaciente}
            />
        </Layout>
    );
};

export default PacientesPage;