import React, { useState } from 'react';
import { TextField, Button, Grid, Typography, Select, MenuItem, IconButton, Card, CardContent } from '@mui/material';
import { Delete, Edit, AddCircle } from '@mui/icons-material';

const Templates = () => {
  const [templates, setTemplates] = useState([]);
  const [newField, setNewField] = useState({ label: '', type: 'text', required: false });
  const [formFields, setFormFields] = useState([]);
  const [templateName, setTemplateName] = useState('');
  const [editIndex, setEditIndex] = useState(null);

  // Handle new field change
  const handleFieldChange = (e) => {
    setNewField({ ...newField, [e.target.name]: e.target.value });
  };

  // Add a new field to the form template
  const addField = () => {
    setFormFields([...formFields, newField]);
    setNewField({ label: '', type: 'text', required: false });
  };

  // Save the form template
  const saveTemplate = () => {
    if (templateName) {
      const newTemplate = { name: templateName, fields: formFields };
      setTemplates([...templates, newTemplate]);
      setFormFields([]);
      setTemplateName('');
    }
  };

  // Delete a template
  const deleteTemplate = (index) => {
    setTemplates(templates.filter((_, idx) => idx !== index));
  };

  // Edit a template
  const editTemplate = (index) => {
    setTemplateName(templates[index].name);
    setFormFields(templates[index].fields);
    setEditIndex(index);
  };

  // Update template after editing
  const updateTemplate = () => {
    const updatedTemplates = templates.map((template, idx) =>
      idx === editIndex ? { name: templateName, fields: formFields } : template
    );
    setTemplates(updatedTemplates);
    setFormFields([]);
    setTemplateName('');
    setEditIndex(null);
  };

  return (
    <div>
      <Typography variant="h4" gutterBottom>Form Templates</Typography>

      {/* Template creation section */}
      <Typography variant="h6" gutterBottom>Create New Template</Typography>
      <TextField
        label="Template Name"
        value={templateName}
        onChange={(e) => setTemplateName(e.target.value)}
        fullWidth
        required
        style={{ marginBottom: '20px' }}
      />

      <Grid container spacing={2}>
        <Grid item xs={6}>
          <TextField
            label="Field Label"
            name="label"
            value={newField.label}
            onChange={handleFieldChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={4}>
          <Select
            label="Field Type"
            name="type"
            value={newField.type}
            onChange={handleFieldChange}
            fullWidth
          >
            <MenuItem value="text">Text</MenuItem>
            <MenuItem value="number">Number</MenuItem>
            <MenuItem value="date">Date</MenuItem>
            <MenuItem value="checkbox">Checkbox</MenuItem>
            <MenuItem value="select">Dropdown</MenuItem>
          </Select>
        </Grid>
        <Grid item xs={2}>
          <Button
            variant="contained"
            color="primary"
            startIcon={<AddCircle />}
            onClick={addField}
          >
            Add Field
          </Button>
        </Grid>
      </Grid>

      {/* Form fields preview */}
      <Typography variant="h6" style={{ marginTop: '20px' }}>Template Preview:</Typography>
      <Grid container spacing={2}>
        {formFields.map((field, index) => (
          <Grid item xs={12} key={index}>
            <Card>
              <CardContent>
                <Typography variant="body1">{field.label} ({field.type})</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Save or Update template */}
      <div style={{ marginTop: '20px' }}>
        {editIndex !== null ? (
          <Button variant="contained" color="primary" onClick={updateTemplate}>
            Update Template
          </Button>
        ) : (
          <Button variant="contained" color="primary" onClick={saveTemplate}>
            Save Template
          </Button>
        )}
      </div>

      {/* List of saved templates */}
      <Typography variant="h6" style={{ marginTop: '40px' }}>Saved Templates:</Typography>
      <Grid container spacing={2}>
        {templates.map((template, index) => (
          <Grid item xs={12} key={index}>
            <Card>
              <CardContent>
                <Typography variant="h6">{template.name}</Typography>
                <Grid container spacing={1}>
                  {template.fields.map((field, idx) => (
                    <Grid item xs={6} key={idx}>
                      <Typography variant="body2">{field.label} ({field.type})</Typography>
                    </Grid>
                  ))}
                </Grid>
                <IconButton onClick={() => editTemplate(index)}>
                  <Edit />
                </IconButton>
                <IconButton onClick={() => deleteTemplate(index)}>
                  <Delete />
                </IconButton>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default Templates;
