import React, { useState } from 'react';
import { TextField, Button, Grid, Typography, IconButton, MenuItem, Select, Card, CardContent } from '@mui/material';
import { Edit, Delete, Done } from '@mui/icons-material';

const Prospects = () => {
  const [prospects, setProspects] = useState([]);
  const [newProspect, setNewProspect] = useState({ name: '', contact: '', status: 'Interested', notes: '' });
  const [editIndex, setEditIndex] = useState(null);
  const [editedProspect, setEditedProspect] = useState(null);

  // Handle input change for new or edited prospect
  const handleChange = (e) => {
    setNewProspect({ ...newProspect, [e.target.name]: e.target.value });
  };

  const handleEditChange = (e) => {
    setEditedProspect({ ...editedProspect, [e.target.name]: e.target.value });
  };

  // Add a new prospect
  const addProspect = (e) => {
    e.preventDefault();
    setProspects([...prospects, newProspect]);
    setNewProspect({ name: '', contact: '', status: 'Interested', notes: '' });
  };

  // Save edited prospect
  const saveChanges = (index) => {
    const updatedProspects = prospects.map((prospect, idx) =>
      idx === index ? editedProspect : prospect
    );
    setProspects(updatedProspects);
    setEditIndex(null);
  };

  // Delete a prospect
  const deleteProspect = (index) => {
    setProspects(prospects.filter((_, idx) => idx !== index));
  };

  return (
    <div>
      <Typography variant="h4" gutterBottom>Prospect Management</Typography>

      {/* Form to add a new prospect */}
      <form onSubmit={addProspect}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Prospect Name"
              name="name"
              value={newProspect.name}
              onChange={handleChange}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Contact Information"
              name="contact"
              value={newProspect.contact}
              onChange={handleChange}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12}>
            <Select
              label="Status"
              name="status"
              value={newProspect.status}
              onChange={handleChange}
              fullWidth
              required
            >
              <MenuItem value="Interested">Interested</MenuItem>
              <MenuItem value="In Discussion">In Discussion</MenuItem>
              <MenuItem value="Not Interested">Not Interested</MenuItem>
            </Select>
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Notes"
              name="notes"
              value={newProspect.notes}
              onChange={handleChange}
              multiline
              rows={3}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary">
              Add Prospect
            </Button>
          </Grid>
        </Grid>
      </form>

      {/* List of prospects */}
      <Grid container spacing={2} style={{ marginTop: '20px' }}>
        {prospects.map((prospect, index) => (
          <Grid item xs={12} key={index}>
            <Card>
              <CardContent>
                <Typography variant="h6">{prospect.name}</Typography>
                <Typography variant="body2">Contact: {prospect.contact}</Typography>
                <Typography variant="body2">Status: {prospect.status}</Typography>
                <Typography variant="body2">Notes: {prospect.notes}</Typography>

                {editIndex === index ? (
                  <div>
                    <TextField
                      label="Prospect Name"
                      name="name"
                      value={editedProspect.name}
                      onChange={handleEditChange}
                      fullWidth
                    />
                    <TextField
                      label="Contact Information"
                      name="contact"
                      value={editedProspect.contact}
                      onChange={handleEditChange}
                      fullWidth
                    />
                    <Select
                      name="status"
                      value={editedProspect.status}
                      onChange={handleEditChange}
                      fullWidth
                    >
                      <MenuItem value="Interested">Interested</MenuItem>
                      <MenuItem value="In Discussion">In Discussion</MenuItem>
                      <MenuItem value="Not Interested">Not Interested</MenuItem>
                    </Select>
                    <TextField
                      label="Notes"
                      name="notes"
                      value={editedProspect.notes}
                      onChange={handleEditChange}
                      multiline
                      rows={3}
                      fullWidth
                    />
                    <Button
                      onClick={() => saveChanges(index)}
                      variant="contained"
                      color="primary"
                      startIcon={<Done />}
                    >
                      Save
                    </Button>
                  </div>
                ) : (
                  <div>
                    <IconButton
                      onClick={() => {
                        setEditIndex(index);
                        setEditedProspect(prospect);
                      }}
                    >
                      <Edit />
                    </IconButton>
                    <IconButton onClick={() => deleteProspect(index)}>
                      <Delete />
                    </IconButton>
                  </div>
                )}
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default Prospects;
