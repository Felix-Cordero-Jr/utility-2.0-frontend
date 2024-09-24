import React from 'react';
import { Grid, Card, CardContent, Typography, ListItemIcon, ButtonBase } from '@mui/material';
import TaskIcon from '@mui/icons-material/Assignment';
import PeopleIcon from '@mui/icons-material/People';
import FolderIcon from '@mui/icons-material/Folder';
import BusinessIcon from '@mui/icons-material/Business';
import AddIcon from '@mui/icons-material/Add';
import ArchiveIcon from '@mui/icons-material/Archive';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation

const MainContent = ({ selectedMenu }) => {
  const navigate = useNavigate();

  // Menu items for the dashboard
  const dashboardItems = [
    { title: 'Inquiries', icon: <TaskIcon />, path: '/inquiries' },
    { title: 'Tasks', icon: <TaskIcon />, path: '/tasks' },
    { title: "Clients' Progress", icon: <PeopleIcon />, path: '/clients-progress' },
    { title: 'Prospects', icon: <BusinessIcon />, path: '/prospects' },
    { title: 'Add Client', icon: <AddIcon />, path: '/add-client' },
    { title: 'Templates', icon: <TaskIcon />, path: '/templates' },
    { title: 'Create a Template', icon: <AddIcon />, path: '/create-template' },
    { title: 'File Manager', icon: <FolderIcon />, path: '/file-manager' },
    { title: 'Archives - Companies', icon: <ArchiveIcon />, path: '/archives-companies' },
    { title: 'Archives - Forms or Templates', icon: <ArchiveIcon />, path: '/forms-or-templates' },
    { title: 'Users - Add a Company', icon: <PeopleIcon />, path: '/add-company' },
    { title: 'Users - Add a User', icon: <PeopleIcon />, path: '/add-user' },
  ];

  const menuItems = selectedMenu === 'Dashboard' ? dashboardItems : [];

  const handleCardClick = (path) => {
    navigate(path);
  };

  return (
    <Grid container spacing={3}>
      {menuItems.map((item, index) => (
        <Grid item xs={12} sm={6} md={4} key={index}>
          <ButtonBase sx={{ width: '100%' }} onClick={() => handleCardClick(item.path)}>
            <Card sx={{ minHeight: 120, width: '100%' }}>
              <CardContent>
                <ListItemIcon sx={{ mb: 1 }}>
                  {item.icon}
                </ListItemIcon>
                <Typography variant="h6">{item.title}</Typography>
              </CardContent>
            </Card>
          </ButtonBase>
        </Grid>
      ))}
    </Grid>
  );
};

export default MainContent;
