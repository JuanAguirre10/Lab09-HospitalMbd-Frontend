import React, { useState, useEffect } from 'react';
import { Grid, Card, CardContent, Typography, Box, Paper } from '@mui/material';
import { People, LocalHospital, CalendarMonth, Receipt } from '@mui/icons-material';
import Layout from '../components/layout/Layout';
import { getAllPacientes } from '../services/pacienteService';
import { getAllMedicos } from '../services/medicoService';
import { getAllCitas } from '../services/citaService';
import { getAllFacturas } from '../services/facturaService';

const StatCard = ({ title, value, icon, color }) => (
    <Card sx={{ height: '100%' }}>
        <CardContent>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box>
                    <Typography color="text.secondary" variant="body2" gutterBottom>
                        {title}
                    </Typography>
                    <Typography variant="h4" component="div" sx={{ fontWeight: 600 }}>
                        {value}
                    </Typography>
                </Box>
                <Box
                    sx={{
                        bgcolor: `${color}.light`,
                        borderRadius: 2,
                        p: 2,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    {React.cloneElement(icon, { sx: { fontSize: 40, color: `${color}.main` } })}
                </Box>
            </Box>
        </CardContent>
    </Card>
);

const Dashboard = () => {
    const [stats, setStats] = useState({
        pacientes: 0,
        medicos: 0,
        citas: 0,
        facturas: 0,
    });

    useEffect(() => {
        loadStats();
    }, []);

    const loadStats = async () => {
        try {
            const [pacientesRes, medicosRes, citasRes, facturasRes] = await Promise.all([
                getAllPacientes(),
                getAllMedicos(),
                getAllCitas(),
                getAllFacturas(),
            ]);

            setStats({
                pacientes: pacientesRes.data.length,
                medicos: medicosRes.data.length,
                citas: citasRes.data.length,
                facturas: facturasRes.data.length,
            });
        } catch (error) {
            console.error('Error al cargar estadísticas:', error);
        }
    };

    return (
        <Layout>
            <Box sx={{ mb: 4 }}>
                <Typography variant="h4" sx={{ fontWeight: 600, mb: 1 }}>
                    Dashboard
                </Typography>
                <Typography variant="body1" color="text.secondary">
                    Resumen general del sistema hospitalario
                </Typography>
            </Box>

            <Grid container spacing={3}>
                <Grid item xs={12} sm={6} md={3}>
                    <StatCard
                        title="Total Pacientes"
                        value={stats.pacientes}
                        icon={<People />}
                        color="primary"
                    />
                </Grid>

                <Grid item xs={12} sm={6} md={3}>
                    <StatCard
                        title="Total Médicos"
                        value={stats.medicos}
                        icon={<LocalHospital />}
                        color="secondary"
                    />
                </Grid>

                <Grid item xs={12} sm={6} md={3}>
                    <StatCard
                        title="Citas Registradas"
                        value={stats.citas}
                        icon={<CalendarMonth />}
                        color="info"
                    />
                </Grid>

                <Grid item xs={12} sm={6} md={3}>
                    <StatCard
                        title="Facturas Emitidas"
                        value={stats.facturas}
                        icon={<Receipt />}
                        color="success"
                    />
                </Grid>

                <Grid item xs={12}>
                    <Paper sx={{ p: 3 }}>
                        <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                            Actividad Reciente
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Panel de actividades y notificaciones del sistema
                        </Typography>
                    </Paper>
                </Grid>
            </Grid>
        </Layout>
    );
};

export default Dashboard;