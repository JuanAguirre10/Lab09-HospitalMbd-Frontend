import React, { useState, useEffect } from 'react';
import { 
    Box, 
    Button, 
    TextField, 
    InputAdornment,
    Chip,
} from '@mui/material';
import { 
    Add, 
    Search, 
    FilterList,
} from '@mui/icons-material';
import Layout from '../components/layout/Layout';
import { getAllConsultas, deleteConsulta } from '../services/consultaService';
import { toast } from 'react-toastify';
import ConsultaTable from '../components/consultas/ConsultaTable';
import ConsultaForm from '../components/consultas/ConsultaForm';
import ConsultaDetail from '../components/consultas/ConsultaDetail';

const ConsultasPage = () => {
    const [consultas, setConsultas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [openForm, setOpenForm] = useState(false);
    const [openDetail, setOpenDetail] = useState(false);
    const [selectedConsulta, setSelectedConsulta] = useState(null);
    const [mode, setMode] = useState('create');

    useEffect(() => {
        loadConsultas();
    }, []);

    const loadConsultas = async () => {
        try {
            setLoading(true);
            const response = await getAllConsultas();
            setConsultas(response.data || []);
        } catch (error) {
            toast.error('Error al cargar consultas');
            setConsultas([]);
        } finally {
            setLoading(false);
        }
    };

    const handleCreate = () => {
        setMode('create');
        setSelectedConsulta(null);
        setOpenForm(true);
    };

    const handleEdit = (consulta) => {
        setMode('edit');
        setSelectedConsulta(consulta);
        setOpenForm(true);
    };

    const handleView = (consulta) => {
        setSelectedConsulta(consulta);
        setOpenDetail(true);
    };

    const handleDelete = async (id) => {
        if (window.confirm('¿Está seguro de eliminar esta consulta?')) {
            try {
                await deleteConsulta(id);
                toast.success('Consulta eliminada exitosamente');
                loadConsultas();
            } catch (error) {
                toast.error('Error al eliminar consulta');
            }
        }
    };

    const handleCloseForm = () => {
        setOpenForm(false);
        setSelectedConsulta(null);
    };

    const handleSuccess = () => {
        loadConsultas();
        handleCloseForm();
    };

    const filteredConsultas = consultas.filter(c => 
        c.idPaciente?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.idMedico?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.motivoConsulta?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <Layout>
            <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
                        <h2 style={{ margin: 0, fontSize: '2rem', fontWeight: 900 }}>Consultas Médicas</h2>
                        <Chip 
                            label={`${filteredConsultas.length} registros`} 
                            color="warning" 
                            size="small"
                        />
                    </Box>
                    <p style={{ margin: 0, color: '#64748b', fontSize: '1.1rem' }}>
                        Gestión de consultas médicas realizadas
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
                    Nueva Consulta
                </Button>
            </Box>

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
                <Button
                    variant="outlined"
                    startIcon={<FilterList />}
                    sx={{ minWidth: 120 }}
                >
                    Filtros
                </Button>
            </Box>

            <ConsultaTable
                consultas={filteredConsultas}
                loading={loading}
                onEdit={handleEdit}
                onDelete={handleDelete}
                onView={handleView}
            />

            <ConsultaForm
                open={openForm}
                onClose={handleCloseForm}
                onSuccess={handleSuccess}
                consulta={selectedConsulta}
                mode={mode}
            />

            <ConsultaDetail
                open={openDetail}
                onClose={() => setOpenDetail(false)}
                consulta={selectedConsulta}
            />
        </Layout>
    );
};

export default ConsultasPage;