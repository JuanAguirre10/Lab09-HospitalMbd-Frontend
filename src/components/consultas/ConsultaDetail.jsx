import React, { useState, useEffect } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Box,
    Typography,
    Divider,
    Grid,
    IconButton,
    Paper,
} from '@mui/material';
import { Close, Person, LocalHospital, CalendarMonth, AccessTime, Description, Notes } from '@mui/icons-material';
import { getPacienteById } from '../../services/pacienteService';
import { getMedicoById } from '../../services/medicoService';

const DetailItem = ({ icon: Icon, label, value, color = 'primary' }) => (
    <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2, mb: 2 }}>
        <Box
            sx={{
                width: 40,
                height: 40,
                borderRadius: 2,
                bgcolor: `${color}.light`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            <Icon sx={{ color: `${color}.main`, fontSize: 20 }} />
        </Box>
        <Box sx={{ flex: 1 }}>
            <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600 }}>
                {label}
            </Typography>
            <Typography variant="body1" sx={{ fontWeight: 500 }}>
                {value || 'No especificado'}
            </Typography>
        </Box>
    </Box>
);

const ConsultaDetail = ({ open, onClose, consulta }) => {
    const [paciente, setPaciente] = useState(null);
    const [medico, setMedico] = useState(null);

    useEffect(() => {
        if (consulta && open) {
            loadData();
        }
    }, [consulta, open]);

    const loadData = async () => {
        if (!consulta) return;
        
        try {
            const [pacienteRes, medicoRes] = await Promise.all([
                getPacienteById(consulta.idPaciente).catch(() => null),
                getMedicoById(consulta.idMedico).catch(() => null),
            ]);
            
            setPaciente(pacienteRes?.data);
            setMedico(medicoRes?.data);
        } catch (error) {
            console.error('Error cargando datos:', error);
        }
    };

    if (!consulta) return null;

    const nombrePaciente = paciente 
        ? `${paciente.nombres} ${paciente.apellidos}` 
        : consulta.nombrePaciente || consulta.idPaciente;

    const nombreMedico = medico 
        ? `Dr(a). ${medico.nombres} ${medico.apellidos}` 
        : consulta.nombreMedico || consulta.idMedico;

    return (
        <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
            <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', pb: 2 }}>
                <Typography variant="h5" sx={{ fontWeight: 700 }}>
                    Detalle de la Consulta
                </Typography>
                <IconButton onClick={onClose}>
                    <Close />
                </IconButton>
            </DialogTitle>

            <DialogContent dividers>
                <Paper sx={{ p: 3, mb: 3, bgcolor: 'warning.lighter' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                        <Description sx={{ fontSize: 40, color: 'warning.main' }} />
                        <Box>
                            <Typography variant="h5" sx={{ fontWeight: 700 }}>
                                Consulta Médica
                            </Typography>
                            <Typography variant="body1" color="text.secondary">
                                {consulta.fecha} - {consulta.hora}
                            </Typography>
                        </Box>
                    </Box>
                </Paper>

                <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                        <DetailItem
                            icon={Person}
                            label="PACIENTE"
                            value={nombrePaciente}
                            color="primary"
                        />
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <DetailItem
                            icon={LocalHospital}
                            label="MÉDICO"
                            value={nombreMedico}
                            color="secondary"
                        />
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <DetailItem
                            icon={CalendarMonth}
                            label="FECHA"
                            value={consulta.fecha}
                            color="info"
                        />
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <DetailItem
                            icon={AccessTime}
                            label="HORA"
                            value={consulta.hora}
                            color="warning"
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <DetailItem
                            icon={Description}
                            label="MOTIVO DE CONSULTA"
                            value={consulta.motivoConsulta}
                            color="success"
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <DetailItem
                            icon={Notes}
                            label="OBSERVACIONES"
                            value={consulta.observaciones}
                            color="error"
                        />
                    </Grid>
                </Grid>

                <Divider sx={{ my: 3 }} />

                <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
                    Información del Sistema
                </Typography>

                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', p: 2, bgcolor: 'background.default', borderRadius: 1 }}>
                        <Typography variant="body2" color="text.secondary" fontWeight={600}>
                            ID de la Consulta
                        </Typography>
                        <Typography variant="body2" fontWeight={500}>
                            {consulta.id}
                        </Typography>
                    </Box>
                </Box>
            </DialogContent>

            <DialogActions sx={{ px: 3, py: 2 }}>
                <Button onClick={onClose} variant="contained">
                    Cerrar
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default ConsultaDetail;