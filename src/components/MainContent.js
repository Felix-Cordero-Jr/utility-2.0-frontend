import React from 'react';
import { Grid, Card, CardContent, Typography, ButtonBase, ListItemIcon } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import BusinessIcon from '@mui/icons-material/Business'; // Represents "Clients"
import ArchiveIcon from '@mui/icons-material/Archive';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import FolderIcon from '@mui/icons-material/Folder';
import PeopleIcon from '@mui/icons-material/People';
import TaskIcon from '@mui/icons-material/Assignment';
import TemplateIcon from '@mui/icons-material/Description'; // Example for templates
import AddIcon from '@mui/icons-material/Add';

const MainContent = ({ selectedMenu, onCardClick }) => {
  // Icon mapping for menu items
  const icons = {
    'Inquiries': <TaskIcon />,
    'Tasks': <TaskIcon />,
    'Clients\' Progress': <PeopleIcon />,
    'Prospects': <BusinessIcon />,
    'Add Client': <AddIcon />,
    'Forms': <FormatListBulletedIcon />,
    'Templates': <TemplateIcon />,
    'Create a Template': <AddIcon />,
    'File Manager': <FolderIcon />,
    'Archives': <ArchiveIcon />,
    'Users': <PeopleIcon />,
    'Dashboard': <DashboardIcon />
  };

  // Menu items for the dashboard or the selected menu
  const menuItems = selectedMenu === 'Dashboard' ? [
    'Inquiries',
    'Tasks',
    'Clients\' Progress',
    'Prospects',
    'Add Client',
    'Forms',
    'Templates',
    'Create a Template',
    'File Manager',
    'Archives',
    'Users'
  ] : [selectedMenu];

  return (
    <Grid container spacing={3}>
      {menuItems.map((item, index) => (
        <Grid item xs={12} sm={6} md={4} key={index}>
          <ButtonBase 
            sx={{ width: '100%' }} 
            onClick={() => onCardClick(item)} // Trigger onCardClick with the item name
          >
            <Card sx={{ minHeight: 150, width: '100%' }}>
              <CardContent>
                <ListItemIcon sx={{ mb: 1 }}>
                  {icons[item]} {/* Display the icon associated with the item */}
                </ListItemIcon>
                <Typography variant="h6">{item}</Typography>
              </CardContent>
            </Card>
          </ButtonBase>
        </Grid>
      ))}
    </Grid>
  );
};

export default MainContent;
