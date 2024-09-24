import React, { useState } from 'react';
import { Drawer, Box, List, ListItemButton, ListItemIcon, ListItemText, Collapse, Avatar, Typography } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import BusinessIcon from '@mui/icons-material/Business';
import ArchiveIcon from '@mui/icons-material/Archive';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import FolderIcon from '@mui/icons-material/Folder';
import PeopleIcon from '@mui/icons-material/People';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useNavigate } from 'react-router-dom';

const drawerWidth = 240;

const Sidebar = ({ onMenuClick }) => {
  const [openSections, setOpenSections] = useState({
    dashboard: false,
    clients: false,
    archives: false,
    forms: false,
    users: false,
  });

  const navigate = useNavigate();

  const toggleSection = (section) => {
    setOpenSections((prevState) => ({
      ...prevState,
      [section]: !prevState[section],
    }));
  };

  const handleNavigation = (path) => {
    navigate(path);
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
          marginTop: '64px',
        },
      }}
    >
      <Box sx={{ overflow: 'auto' }}>
        <List>
          {/* Space before the first menu item */}
          <Box sx={{ mt: 3 }} />

          {/* Dashboard */}
          <ListItemButton onClick={() => { 
              toggleSection('dashboard'); 
              onMenuClick('Dashboard'); 
              handleNavigation('/'); // Always navigate to the main dashboard
            }}>
            <ListItemIcon><DashboardIcon /></ListItemIcon>
            <ListItemText primary="Dashboard" />
            {openSections.dashboard ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          </ListItemButton>
          <Collapse in={openSections.dashboard} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItemButton sx={{ pl: 4 }} onClick={() => handleNavigation('/inquiries')}>
                <ListItemText primary="Inquiries" />
              </ListItemButton>
              <ListItemButton sx={{ pl: 4 }} onClick={() => handleNavigation('/tasks')}>
                <ListItemText primary="Tasks" />
              </ListItemButton>
              <ListItemButton sx={{ pl: 4 }} onClick={() => handleNavigation('/clients-progress')}>
                <ListItemText primary="Clients\' Progress" />
              </ListItemButton>
            </List>
          </Collapse>

          {/* Clients */}
          <ListItemButton onClick={() => { toggleSection('clients'); onMenuClick('Clients'); }}>
            <ListItemIcon><BusinessIcon /></ListItemIcon>
            <ListItemText primary="Clients" />
            {openSections.clients ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          </ListItemButton>
          <Collapse in={openSections.clients} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItemButton sx={{ pl: 4 }} onClick={() => handleNavigation('/prospects')}>
                <ListItemText primary="Prospects" />
              </ListItemButton>
              <ListItemButton sx={{ pl: 4 }} onClick={() => handleNavigation('/add-client')}>
                <ListItemText primary="Add Client" />
              </ListItemButton>
            </List>
          </Collapse>

          {/* Forms */}
          <ListItemButton onClick={() => { toggleSection('forms'); onMenuClick('Forms'); }}>
            <ListItemIcon><FormatListBulletedIcon /></ListItemIcon>
            <ListItemText primary="Forms" />
            {openSections.forms ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          </ListItemButton>
          <Collapse in={openSections.forms} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItemButton sx={{ pl: 4 }} onClick={() => handleNavigation('/templates')}>
                <ListItemText primary="Templates" />
              </ListItemButton>
              <ListItemButton sx={{ pl: 4 }} onClick={() => handleNavigation('/create-template')}>
                <ListItemText primary="Create a Template" />
              </ListItemButton>
            </List>
          </Collapse>

          {/* Archives */}
          <ListItemButton onClick={() => { toggleSection('archives'); onMenuClick('Archives'); }}>
            <ListItemIcon><ArchiveIcon /></ListItemIcon>
            <ListItemText primary="Archives" />
            {openSections.archives ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          </ListItemButton>
          <Collapse in={openSections.archives} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItemButton sx={{ pl: 4 }} onClick={() => handleNavigation('/archives-companies')}>
                <ListItemText primary="Companies" />
              </ListItemButton>
              <ListItemButton sx={{ pl: 4 }} onClick={() => handleNavigation('/forms-or-templates')}>
                <ListItemText primary="Forms or Templates" />
              </ListItemButton>
            </List>
          </Collapse>

          {/* File Manager */}
          <ListItemButton onClick={() => handleNavigation('/file-manager')}>
            <ListItemIcon><FolderIcon /></ListItemIcon>
            <ListItemText primary="File Manager" />
          </ListItemButton>

          {/* Users */}
          <ListItemButton onClick={() => { toggleSection('users'); onMenuClick('Users'); }}>
            <ListItemIcon><PeopleIcon /></ListItemIcon>
            <ListItemText primary="Users" />
            {openSections.users ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          </ListItemButton>
          <Collapse in={openSections.users} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItemButton sx={{ pl: 4 }} onClick={() => handleNavigation('/add-company')}>
                <ListItemText primary="Add a Company" />
              </ListItemButton>
              <ListItemButton sx={{ pl: 4 }} onClick={() => handleNavigation('/add-user')}>
                <ListItemText primary="Add a User" />
              </ListItemButton>
            </List>
          </Collapse>

          {/* Admin User Info */}
          <Box sx={{ textAlign: 'center', mt: 2 }}>
            <Avatar alt="Admin User" src="https://via.placeholder.com/150" sx={{ width: 80, height: 80, margin: 'auto', marginBottom: 1 }} />
            <Typography variant="body1">Admin User</Typography>
            <Typography variant="body2" color="textSecondary">admin@example.com</Typography>
          </Box>
        </List>
      </Box>
    </Drawer>
  );
};

export default Sidebar;
