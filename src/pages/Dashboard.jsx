import React, { useState, useEffect } from 'react';
import { Grid, Card, CardContent, Typography, Box, LinearProgress, Chip } from '@mui/material';
import { People, LocalHospital, CalendarMonth, Receipt, TrendingUp, Favorite, Hotel, EventAvailable } from '@mui/icons-material';
import Layout from '../components/layout/Layout';
import { getAllPacientes } from '../services/pacienteService';
import { getAllMedicos } from '../services/medicoService';
import { getAllCitas } from '../services/citaService';
import { getAllFacturas } from '../services/facturaService';

const StatCard = ({ title, value, icon: Icon, color, subtitle }) => (
    <Card 
        sx={{ 
            height: '100%',
            background: `linear-gradient(135deg, ${color}15 0%, ${color}05 100%)`,
            border: `2px solid ${color}30`,
            transition: 'all 0.3s ease',
            '&:hover': {
                transform: 'translateY(-8px)',
                boxShadow: `0 12px 24px ${color}30`,
            }
        }}
    >
        <CardContent sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', mb: 2 }}>
                <Box 
                    sx={{ 
                        width: 64,
                        height: 64,
                        borderRadius: 3,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        bgcolor: color,
                        boxShadow: `0 8px 16px ${color}40`,
                    }}
                >
                    <Icon sx={{ fontSize: 32, color: 'white' }} />
                </Box>
            </Box>
            
            <Typography 
                variant="h3" 
                sx={{ 
                    fontWeight: 800,
                    color: 'text.primary',
                    mb: 1,
                    fontSize: '2.5rem',
                }}
            >
                {value}
            </Typography>
            
            <Typography 
                variant="body1" 
                sx={{ 
                    color: 'text.secondary',
                    fontWeight: 600,
                    mb: 0.5,
                }}
            >
                {title}
            </Typography>
            
            {subtitle && (
                <Typography variant="caption" color="text.secondary">
                    {subtitle}
                </Typography>
            )}
        </CardContent>
    </Card>
);

const ActivityCard = ({ icon: Icon, title, subtitle, color, count }) => (
    <Box 
        sx={{ 
            p: 2.5,
            borderRadius: 2,
            bgcolor: 'background.paper',
            border: '1px solid',
            borderColor: 'divider',
            display: 'flex',
            alignItems: 'center',
            gap: 2,
            transition: 'all 0.2s ease',
            cursor: 'pointer',
            '&:hover': {
                bgcolor: `${color}10`,
                borderColor: color,
                transform: 'translateX(4px)',
            }
        }}
    >
        <Box 
            sx={{ 
                width: 48,
                height: 48,
                borderRadius: 2,
                bgcolor: `${color}20`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            <Icon sx={{ color: color, fontSize: 24 }} />
        </Box>
        <Box sx={{ flex: 1 }}>
            <Typography variant="body1" sx={{ fontWeight: 600, mb: 0.5 }}>
                {title}
            </Typography>
            <Typography variant="caption" color="text.secondary">
                {subtitle}
            </Typography>
        </Box>
        {count !== undefined && (
            <Chip 
                label={count} 
                size="small" 
                sx={{ 
                    bgcolor: `${color}20`,
                    color: color,
                    fontWeight: 700,
                }}
            />
        )}
    </Box>
);

const Dashboard = () => {
    const [stats, setStats] = useState({
        pacientes: 0,
        medicos: 0,
        citas: 0,
        facturas: 0,
    });
    const [loading, setLoading] = useState(true);

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
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <Layout>
                <Box sx={{ width: '100%' }}>
                    <LinearProgress />
                </Box>
            </Layout>
        );
    }

    return (
        <Layout>
            <Box sx={{ mb: 4 }}>
                <Typography variant="h3" sx={{ fontWeight: 900, mb: 1, color: 'text.primary', letterSpacing: '-0.02em' }}>
                    Dashboard
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ fontSize: '1.1rem' }}>
                    Vista general del sistema de gestión hospitalaria
                </Typography>
            </Box>

            <Grid container spacing={3}>
                <Grid item xs={12} sm={6} lg={3}>
                    <StatCard
                        title="Pacientes"
                        value={stats.pacientes}
                        icon={People}
                        color="#2563eb"
                        subtitle="Registrados en el sistema"
                    />
                </Grid>

                <Grid item xs={12} sm={6} lg={3}>
                    <StatCard
                        title="Médicos"
                        value={stats.medicos}
                        icon={LocalHospital}
                        color="#10b981"
                        subtitle="Personal médico activo"
                    />
                </Grid>

                <Grid item xs={12} sm={6} lg={3}>
                    <StatCard
                        title="Citas"
                        value={stats.citas}
                        icon={CalendarMonth}
                        color="#f59e0b"
                        subtitle="Citas programadas"
                    />
                </Grid>

                <Grid item xs={12} sm={6} lg={3}>
                    <StatCard
                        title="Facturas"
                        value={stats.facturas}
                        icon={Receipt}
                        color="#8b5cf6"
                        subtitle="Facturas emitidas"
                    />
                </Grid>

                <Grid item xs={12} lg={8}>
                    <Card sx={{ height: '100%' }}>
                        <CardContent sx={{ p: 3 }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}>
                                <TrendingUp sx={{ color: 'primary.main' }} />
                                <Typography variant="h6" sx={{ fontWeight: 700 }}>
                                    Actividad Reciente
                                </Typography>
                            </Box>
                            
                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                                <ActivityCard
                                    icon={EventAvailable}
                                    title="Citas de Hoy"
                                    subtitle="Próximas citas programadas"
                                    color="#2563eb"
                                    count={0}
                                />
                                <ActivityCard
                                    icon={Favorite}
                                    title="Consultas Activas"
                                    subtitle="En proceso de atención"
                                    color="#ef4444"
                                    count={0}
                                />
                                <ActivityCard
                                    icon={Hotel}
                                    title="Hospitalizaciones"
                                    subtitle="Pacientes hospitalizados"
                                    color="#10b981"
                                    count={0}
                                />
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>

                <Grid item xs={12} lg={4}>
                    <Card 
                        sx={{ 
                            height: '100%',
                            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                            color: 'white',
                        }}
                    >
                        <CardContent sx={{ p: 3 }}>
                            <Typography variant="h6" sx={{ fontWeight: 700, mb: 3 }}>
                                Accesos Rápidos
                            </Typography>
                            
                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                                <Box 
                                    sx={{ 
                                        p: 2,
                                        borderRadius: 2,
                                        bgcolor: 'rgba(255,255,255,0.15)',
                                        backdropFilter: 'blur(10px)',
                                        cursor: 'pointer',
                                        transition: 'all 0.2s',
                                        '&:hover': {
                                            bgcolor: 'rgba(255,255,255,0.25)',
                                            transform: 'translateX(4px)',
                                        }
                                    }}
                                >
                                    <Typography variant="body1" fontWeight={600}>
                                        📋 Registrar Nueva Cita
                                    </Typography>
                                </Box>
                                <Box 
                                    sx={{ 
                                        p: 2,
                                        borderRadius: 2,
                                        bgcolor: 'rgba(255,255,255,0.15)',
                                        backdropFilter: 'blur(10px)',
                                        cursor: 'pointer',
                                        transition: 'all 0.2s',
                                        '&:hover': {
                                            bgcolor: 'rgba(255,255,255,0.25)',
                                            transform: 'translateX(4px)',
                                        }
                                    }}
                                >
                                    <Typography variant="body1" fontWeight={600}>
                                        👤 Nuevo Paciente
                                    </Typography>
                                </Box>
                                <Box 
                                    sx={{ 
                                        p: 2,
                                        borderRadius: 2,
                                        bgcolor: 'rgba(255,255,255,0.15)',
                                        backdropFilter: 'blur(10px)',
                                        cursor: 'pointer',
                                        transition: 'all 0.2s',
                                        '&:hover': {
                                            bgcolor: 'rgba(255,255,255,0.25)',
                                            transform: 'translateX(4px)',
                                        }
                                    }}
                                >
                                    <Typography variant="body1" fontWeight={600}>
                                        📊 Ver Reportes
                                    </Typography>
                                </Box>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Layout>
    );
};

export default Dashboard;