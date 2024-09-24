import React, { useState } from 'react';
import { TextField, Button, Grid, Typography, Select, MenuItem, IconButton, Card, CardContent } from '@mui/material';
import { Delete, AddCircle, Save } from '@mui/icons-material';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const CreateTemplate = () => {
  const [templateName, setTemplateName] = useState('');
  const [newField, setNewField] = useState({ label: '', type: 'text', required: false });
  const [formFields, setFormFields] = useState([]);

  // Handle new field change
  const handleFieldChange = (e) => {
    setNewField({ ...newField, [e.target.name]: e.target.value });
  };

  // Add a new field to the form
  const addField = () => {
    setFormFields([...formFields, newField]);
    setNewField({ label: '', type: 'text', required: false });
  };

  // Handle field deletion
  const deleteField = (index) => {
    setFormFields(formFields.filter((_, idx) => idx !== index));
  };

  // Save the form template
  const saveTemplate = () => {
    if (!templateName) {
      alert('Template name is required');
      return;
    }
    if (formFields.length === 0) {
      alert('At least one form field is required');
      return;
    }

    const newTemplate = { name: templateName, fields: formFields };
    console.log('Saved template:', newTemplate);
    alert('Template saved successfully!');
    setTemplateName('');
    setFormFields([]);
  };

  // Handle drag and drop for reordering fields
  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const reorderedFields = Array.from(formFields);
    const [movedField] = reorderedFields.splice(result.source.index, 1);
    reorderedFields.splice(result.destination.index, 0, movedField);

    setFormFields(reorderedFields);
  };

  return (
    <div>
      <Typography variant="h4" gutterBottom>Create a Form Template</Typography>

      {/* Template name input */}
      <TextField
        label="Template Name"
        value={templateName}
        onChange={(e) => setTemplateName(e.target.value)}
        fullWidth
        required
        style={{ marginBottom: '20px' }}
      />

      {/* Add field section */}
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

      {/* Field list with drag and drop */}
      <Typography variant="h6" style={{ marginTop: '20px' }}>Form Fields:</Typography>
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="fields">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {formFields.map((field, index) => (
                <Draggable key={index} draggableId={String(index)} index={index}>
                  {(provided) => (
                    <Grid
                      container
                      spacing={2}
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      style={{
                        ...provided.draggableProps.style,
                        marginBottom: '10px',
                      }}
                    >
                      <Grid item xs={8}>
                        <Card>
                          <CardContent>
                            <Typography variant="body1">
                              {field.label} ({field.type})
                            </Typography>
                          </CardContent>
                        </Card>
                      </Grid>
                      <Grid item xs={2}>
                        <IconButton onClick={() => deleteField(index)}>
                          <Delete />
                        </IconButton>
                      </Grid>
                    </Grid>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>

      {/* Save template button */}
      <div style={{ marginTop: '20px' }}>
        <Button
          variant="contained"
          color="primary"
          startIcon={<Save />}
          onClick={saveTemplate}
        >
          Save Template
        </Button>
      </div>
    </div>
  );
};

export default CreateTemplate;
