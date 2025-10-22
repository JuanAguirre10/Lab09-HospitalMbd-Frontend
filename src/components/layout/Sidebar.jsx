import React from 'react';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, ListItemButton, Divider, Toolbar, Box } from '@mui/material';
import { 
    Dashboard, 
    People, 
    LocalHospital, 
    CalendarMonth, 
    Description, 
    Hotel, 
    Receipt, 
    AccountCircle 
} from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';

const drawerWidth = 240;

const menuItems = [
    { text: 'Dashboard', icon: <Dashboard />, path: '/dashboard' },
    { text: 'Pacientes', icon: <People />, path: '/pacientes' },
    { text: 'Médicos', icon: <LocalHospital />, path: '/medicos' },
    { text: 'Citas', icon: <CalendarMonth />, path: '/citas' },
    { text: 'Consultas', icon: <Description />, path: '/consultas' },
    { text: 'Hospitalización', icon: <Hotel />, path: '/hospitalizacion' },
    { text: 'Facturación', icon: <Receipt />, path: '/facturacion' },
    { text: 'Usuarios', icon: <AccountCircle />, path: '/usuarios' },
];

const Sidebar = ({ open, onClose }) => {
    const navigate = useNavigate();
    const location = useLocation();

    const handleNavigation = (path) => {
        navigate(path);
        if (window.innerWidth < 600) {
            onClose();
        }
    };

    return (
        <Drawer
            variant="permanent"
            sx={{
                width: drawerWidth,
                flexShrink: 0,
                '& .MuiDrawer-paper': {
                    width: drawerWidth,
                    boxSizing: 'border-box',
                },
            }}
        >
            <Toolbar />
            <Box sx={{ overflow: 'auto' }}>
                <List>
                    {menuItems.map((item) => (
                        <ListItem key={item.text} disablePadding>
                            <ListItemButton
                                selected={location.pathname === item.path}
                                onClick={() => handleNavigation(item.path)}
                            >
                                <ListItemIcon>
                                    {item.icon}
                                </ListItemIcon>
                                <ListItemText primary={item.text} />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
                <Divider />
            </Box>
        </Drawer>
    );
};

export default Sidebar;