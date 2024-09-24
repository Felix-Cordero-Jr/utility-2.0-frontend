import React, { useState } from 'react';
import { TextField, Button, Grid, Typography, IconButton, Card, CardContent, MenuItem, Select } from '@mui/material';
import { Delete, Restore, Search } from '@mui/icons-material';

const Companies = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('');
  const [archivedCompanies, setArchivedCompanies] = useState([
    { name: 'Company A', industry: 'Tech', archivedDate: '2023-09-01' },
    { name: 'Company B', industry: 'Finance', archivedDate: '2023-08-25' },
    { name: 'Company C', industry: 'Healthcare', archivedDate: '2023-09-15' }
  ]);

  // Handle search input change
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  // Handle filter change
  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  // Filter and search companies
  const filteredCompanies = archivedCompanies.filter((company) => {
    return (
      company.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (filter ? company.industry === filter : true)
    );
  });

  // Restore a company
  const restoreCompany = (index) => {
    const restoredCompany = archivedCompanies[index];
    alert(`Restoring ${restoredCompany.name}...`);
    // Here you can handle the logic for actually restoring the company, e.g., removing it from archivedCompanies.
  };

  // Delete a company
  const deleteCompany = (index) => {
    const updatedCompanies = archivedCompanies.filter((_, idx) => idx !== index);
    setArchivedCompanies(updatedCompanies);
  };

  return (
    <div>
      <Typography variant="h4" gutterBottom>Archived Companies</Typography>

      {/* Search bar */}
      <Grid container spacing={2} style={{ marginBottom: '20px' }}>
        <Grid item xs={8}>
          <TextField
            label="Search Company"
            value={searchTerm}
            onChange={handleSearch}
            fullWidth
          />
        </Grid>
        <Grid item xs={4}>
          <Select
            label="Filter by Industry"
            value={filter}
            onChange={handleFilterChange}
            fullWidth
          >
            <MenuItem value="">All Industries</MenuItem>
            <MenuItem value="Tech">Tech</MenuItem>
            <MenuItem value="Finance">Finance</MenuItem>
            <MenuItem value="Healthcare">Healthcare</MenuItem>
          </Select>
        </Grid>
      </Grid>

      {/* List of archived companies */}
      <Grid container spacing={2}>
        {filteredCompanies.length === 0 ? (
          <Typography variant="h6" color="textSecondary">No archived companies found.</Typography>
        ) : (
          filteredCompanies.map((company, index) => (
            <Grid item xs={12} key={index}>
              <Card>
                <CardContent>
                  <Typography variant="h6">{company.name}</Typography>
                  <Typography variant="body2">Industry: {company.industry}</Typography>
                  <Typography variant="body2">Archived Date: {company.archivedDate}</Typography>

                  <div style={{ marginTop: '10px' }}>
                    <IconButton
                      onClick={() => restoreCompany(index)}
                      color="primary"
                    >
                      <Restore /> Restore
                    </IconButton>
                    <IconButton
                      onClick={() => deleteCompany(index)}
                      color="secondary"
                    >
                      <Delete /> Delete
                    </IconButton>
                  </div>
                </CardContent>
              </Card>
            </Grid>
          ))
        )}
      </Grid>
    </div>
  );
};

export default Companies;
