import React from 'react';
import { Typography, Card, CardContent, Grid, ButtonBase, ListItemIcon } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import BusinessIcon from '@mui/icons-material/Business';
import ArchiveIcon from '@mui/icons-material/Archive';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import FolderIcon from '@mui/icons-material/Folder';
import PeopleIcon from '@mui/icons-material/People';

const menuItems = [
  { name: 'Dashboard', icon: <DashboardIcon />, submenus: ['Inquiries', 'Tasks', 'Clients\' Progress'] },
  { name: 'Clients', icon: <BusinessIcon />, submenus: ['Prospects', 'Add Client'] },
  { name: 'Forms', icon: <FormatListBulletedIcon />, submenus: ['Templates', 'Create a Template'] },
  { name: 'File Manager', icon: <FolderIcon />, submenus: [] },
  { name: 'Archives', icon: <ArchiveIcon />, submenus: ['Companies', 'Forms or Templates'] },
  { name: 'Users', icon: <PeopleIcon />, submenus: ['Add a Company', 'Add a User'] },
];

const Dashboard = ({ onCardClick }) => {
  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Dashboard - All Menus
      </Typography>
      <Grid container spacing={3}>
        {/* Loop through the menuItems to render each menu and its submenus */}
        {menuItems.map((menu, menuIndex) => (
          <Grid item xs={12} sm={6} md={4} key={menuIndex}>
            <ButtonBase onClick={() => onCardClick(menu.name)} sx={{ width: '100%' }}>
              <Card sx={{ minHeight: 150, width: '100%' }}>
                <CardContent>
                  <ListItemIcon>{menu.icon}</ListItemIcon>
                  <Typography variant="h6">{menu.name}</Typography>
                  {menu.submenus.length > 0 && (
                    <Typography variant="body2">
                      Submenus: {menu.submenus.join(', ')}
                    </Typography>
                  )}
                </CardContent>
              </Card>
            </ButtonBase>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default Dashboard;

