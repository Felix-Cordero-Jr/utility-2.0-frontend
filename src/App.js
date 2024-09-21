import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom'; // Import Routes and Route components
import { Box, CssBaseline } from '@mui/material';
import AppBarComponent from './components/AppBarComponent';
import Sidebar from './components/Sidebar';
import MainContent from './components/MainContent';
import InquiriesPage from './pages/Inquiries'; // Example pages
import TasksPage from './pages/Tasks'; // Example pages

const App = () => {
  const [selectedMenu, setSelectedMenu] = useState('Dashboard');

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBarComponent />
      <Sidebar onMenuClick={setSelectedMenu} />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          background: 'linear-gradient(to top left, #e0f7fa, #3880EB)',
          minHeight: '100vh', // Full height
          position: 'absolute',
          top: 0, // Start from the top of the screen
          left: '240px', // Align the content next to the sidebar
          width: 'calc(100% - 240px)', // Ensure the width fills the space next to the sidebar
          zIndex: 1, // Ensure it stays below the AppBar
          paddingTop: '77px', // Ensure there's space for the AppBar to stay on top
          paddingLeft: '25px',
          paddingRight: '25px',
        }}
      >
        <Routes>
          <Route path="/" element={<MainContent selectedMenu={selectedMenu} />} />
          <Route path="/inquiries" element={<InquiriesPage />} />
          <Route path="/tasks" element={<TasksPage />} />
          {/* Add more routes for other pages */}
        </Routes>
      </Box>
    </Box>
  );
};

export default App;
