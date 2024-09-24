import React, { useState } from 'react';
import { TextField, Button, Grid, Typography, IconButton, Card, CardContent, MenuItem, Select } from '@mui/material';
import { Delete, Restore, Search } from '@mui/icons-material';

const FormsOrTemplates = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('');
  const [archivedItems, setArchivedItems] = useState([
    { name: 'Form A', type: 'Form', archivedDate: '2023-09-01' },
    { name: 'Template B', type: 'Template', archivedDate: '2023-08-25' },
    { name: 'Form C', type: 'Form', archivedDate: '2023-09-15' }
  ]);

  // Handle search input change
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  // Handle filter change
  const handleFilterChange = (e) => {
    setFilterType(e.target.value);
  };

  // Filter and search forms/templates
  const filteredItems = archivedItems.filter((item) => {
    return (
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (filterType ? item.type === filterType : true)
    );
  });

  // Restore a form/template
  const restoreItem = (index) => {
    const restoredItem = archivedItems[index];
    alert(`Restoring ${restoredItem.name}...`);
    // Here, handle the logic to actually restore the form/template (e.g., remove from archivedItems and restore to active list).
  };

  // Delete a form/template
  const deleteItem = (index) => {
    const updatedItems = archivedItems.filter((_, idx) => idx !== index);
    setArchivedItems(updatedItems);
  };

  return (
    <div>
      <Typography variant="h4" gutterBottom>Archived Forms or Templates</Typography>

      {/* Search bar and filter options */}
      <Grid container spacing={2} style={{ marginBottom: '20px' }}>
        <Grid item xs={8}>
          <TextField
            label="Search Form or Template"
            value={searchTerm}
            onChange={handleSearch}
            fullWidth
          />
        </Grid>
        <Grid item xs={4}>
          <Select
            label="Filter by Type"
            value={filterType}
            onChange={handleFilterChange}
            fullWidth
          >
            <MenuItem value="">All Types</MenuItem>
            <MenuItem value="Form">Form</MenuItem>
            <MenuItem value="Template">Template</MenuItem>
          </Select>
        </Grid>
      </Grid>

      {/* List of archived forms/templates */}
      <Grid container spacing={2}>
        {filteredItems.length === 0 ? (
          <Typography variant="h6" color="textSecondary">No archived forms or templates found.</Typography>
        ) : (
          filteredItems.map((item, index) => (
            <Grid item xs={12} key={index}>
              <Card>
                <CardContent>
                  <Typography variant="h6">{item.name}</Typography>
                  <Typography variant="body2">Type: {item.type}</Typography>
                  <Typography variant="body2">Archived Date: {item.archivedDate}</Typography>

                  <div style={{ marginTop: '10px' }}>
                    <IconButton
                      onClick={() => restoreItem(index)}
                      color="primary"
                    >
                      <Restore /> Restore
                    </IconButton>
                    <IconButton
                      onClick={() => deleteItem(index)}
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

export default FormsOrTemplates;
