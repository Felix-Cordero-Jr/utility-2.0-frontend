import React from 'react';
import { AppBar, Toolbar, Box, IconButton, Badge, Avatar } from '@mui/material';
import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';
import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';
import { styled, alpha } from '@mui/material/styles';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.5),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.5),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

const AppBarComponent = () => {
  return (
    <AppBar
      position="fixed"
      sx={{
        zIndex: (theme) => theme.zIndex.drawer + 1,
        backgroundColor: 'transparent',
        boxShadow: '',
        borderBottom: '1px solid white',
        height: '64px', // Fix the height of the AppBar
      }}
    >
      <Toolbar sx={{ justifyContent: 'space-between' }}>
  {/* Logo with left padding using Box */}
  <Box sx={{ ml: 2 }}> {/* Adjust 'ml' (margin-left) as needed */}
    <img src="/logo.png" alt="HORIZON Partners Logo" style={{ height: 40}} />
  </Box>


        {/* Search and Notifications */}
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Search>
    <SearchIconWrapper>
      <SearchIcon />
    </SearchIconWrapper>
    <StyledInputBase placeholder="Search…" inputProps={{ 'aria-label': 'search' }} />
  </Search>

          {/* Mail Icon */}
          <IconButton size="large" color="inherit">
            <Badge badgeContent={4} color="error">
              <MailIcon />
            </Badge>
          </IconButton>

          {/* Notifications Icon */}
          <IconButton size="large" color="inherit">
            <Badge badgeContent={17} color="error">
              <NotificationsIcon />
            </Badge>
          </IconButton>

          {/* User Avatar */}
          <Avatar alt="Admin User" src="https://via.placeholder.com/150" sx={{ marginLeft: 2 }} />
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default AppBarComponent;
