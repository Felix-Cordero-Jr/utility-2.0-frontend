import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Box, CssBaseline } from '@mui/material';
import AppBarComponent from './components/AppBarComponent';
import Sidebar from './components/Sidebar';
import MainContent from './components/MainContent';
import InquiriesPage from './pages/Inquiries';
import TasksPage from './pages/Tasks';
import ClientsProgressPage from './pages/Clients/ClientsProgress';
import ProspectsPage from './pages/Clients/Prospects';
import AddClientPage from './pages/Clients/AddClient';
import TemplatesPage from './pages/Forms/Templates';
import CreateTemplatePage from './pages/Forms/CreateTemplate';
import FileManagerPage from './pages/FileManager';
import ArchivesCompaniesPage from './pages/Archives/Companies';
import FormsOrTemplatesPage from './pages/Archives/FormsOrTemplates';
import AddCompanyPage from './pages/Users/AddCompany';
import AddUserPage from './pages/Users/AddUser';

const App = () => {
  const [selectedMenu, setSelectedMenu] = useState('Dashboard'); // Default to "Dashboard"

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      {/* App Bar (Top Navigation) */}
      <AppBarComponent />

      {/* Sidebar with Menu Items */}
      <Sidebar onMenuClick={setSelectedMenu} />

      {/* Main Content Area */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          background: 'linear-gradient(to top left, #e0f7fa, #3880EB)',
          minHeight: '100vh',
          paddingTop: '64px', // Ensures there's space for the AppBar
          paddingLeft: '25px',
          paddingRight: '25px',
        }}
      >
        <Routes>
          <Route path="/" element={<MainContent selectedMenu={selectedMenu} />} />
          <Route path="/inquiries" element={<InquiriesPage />} />
          <Route path="/tasks" element={<TasksPage />} />
          <Route path="/clients-progress" element={<ClientsProgressPage />} />
          <Route path="/prospects" element={<ProspectsPage />} />
          <Route path="/add-client" element={<AddClientPage />} />
          <Route path="/templates" element={<TemplatesPage />} />
          <Route path="/create-template" element={<CreateTemplatePage />} />
          <Route path="/file-manager" element={<FileManagerPage />} />
          <Route path="/archives-companies" element={<ArchivesCompaniesPage />} />
          <Route path="/forms-or-templates" element={<FormsOrTemplatesPage />} />
          <Route path="/add-company" element={<AddCompanyPage />} />
          <Route path="/add-user" element={<AddUserPage />} />
        </Routes>
      </Box>
    </Box>
  );
};

export default App;
