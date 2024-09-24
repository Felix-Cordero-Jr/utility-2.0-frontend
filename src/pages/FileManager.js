import React, { useState } from 'react';
import { TextField, Button, Grid, Typography, IconButton, Card, CardContent, Select, MenuItem } from '@mui/material';
import { Delete, Download, Restore, Upload } from '@mui/icons-material';

const FileManager = () => {
  const [files, setFiles] = useState([
    { name: 'Document1.pdf', type: 'PDF', size: '2 MB', uploadDate: '2024-09-01' },
    { name: 'Image1.jpg', type: 'Image', size: '1.5 MB', uploadDate: '2024-09-02' },
    { name: 'Presentation.pptx', type: 'PPT', size: '3 MB', uploadDate: '2024-09-05' }
  ]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('');

  // Handle file upload
  const handleFileUpload = (e) => {
    const uploadedFiles = Array.from(e.target.files).map((file) => ({
      name: file.name,
      type: file.type.split('/')[1].toUpperCase(), // Get the file extension as type
      size: `${(file.size / (1024 * 1024)).toFixed(2)} MB`, // Convert size to MB
      uploadDate: new Date().toISOString().split('T')[0] // Current date
    }));
    setFiles([...files, ...uploadedFiles]);
  };

  // Handle search input change
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  // Handle filter change
  const handleFilterChange = (e) => {
    setFilterType(e.target.value);
  };

  // Filter and search files
  const filteredFiles = files.filter((file) => {
    return (
      file.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (filterType ? file.type === filterType : true)
    );
  });

  // Download file (simulation)
  const downloadFile = (file) => {
    alert(`Downloading ${file.name}...`);
    // Logic for downloading the file
  };

  // Delete file
  const deleteFile = (index) => {
    const updatedFiles = files.filter((_, idx) => idx !== index);
    setFiles(updatedFiles);
  };

  // Restore file
  const restoreFile = (index) => {
    const restoredFile = files[index];
    alert(`Restoring ${restoredFile.name}...`);
    // Logic for restoring the file
  };

  return (
    <div>
      <Typography variant="h4" gutterBottom>File Manager</Typography>

      {/* File upload */}
      <Grid container spacing={2} style={{ marginBottom: '20px' }}>
        <Grid item xs={8}>
          <Button
            variant="contained"
            color="primary"
            component="label"
            startIcon={<Upload />}
          >
            Upload Files
            <input
              type="file"
              hidden
              multiple
              onChange={handleFileUpload}
            />
          </Button>
        </Grid>
        <Grid item xs={4}>
          <TextField
            label="Search Files"
            value={searchTerm}
            onChange={handleSearch}
            fullWidth
          />
        </Grid>
      </Grid>

      {/* Filter options */}
      <Grid container spacing={2} style={{ marginBottom: '20px' }}>
        <Grid item xs={12}>
          <Select
            label="Filter by Type"
            value={filterType}
            onChange={handleFilterChange}
            fullWidth
          >
            <MenuItem value="">All Types</MenuItem>
            <MenuItem value="PDF">PDF</MenuItem>
            <MenuItem value="Image">Image</MenuItem>
            <MenuItem value="PPT">PPT</MenuItem>
            <MenuItem value="DOC">DOC</MenuItem>
          </Select>
        </Grid>
      </Grid>

      {/* List of files */}
      <Grid container spacing={2}>
        {filteredFiles.length === 0 ? (
          <Typography variant="h6" color="textSecondary">No files found.</Typography>
        ) : (
          filteredFiles.map((file, index) => (
            <Grid item xs={12} key={index}>
              <Card>
                <CardContent>
                  <Typography variant="h6">{file.name}</Typography>
                  <Typography variant="body2">Type: {file.type}</Typography>
                  <Typography variant="body2">Size: {file.size}</Typography>
                  <Typography variant="body2">Upload Date: {file.uploadDate}</Typography>

                  <div style={{ marginTop: '10px' }}>
                    <IconButton
                      onClick={() => downloadFile(file)}
                      color="primary"
                    >
                      <Download /> Download
                    </IconButton>
                    <IconButton
                      onClick={() => restoreFile(index)}
                      color="primary"
                    >
                      <Restore /> Restore
                    </IconButton>
                    <IconButton
                      onClick={() => deleteFile(index)}
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

export default FileManager;
