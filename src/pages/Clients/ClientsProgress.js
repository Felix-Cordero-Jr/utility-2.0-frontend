import React, { useState } from 'react';
import { Typography, TextField, MenuItem, Button, Grid, LinearProgress, IconButton, Select, Card, CardContent } from '@mui/material';
import { Edit, Done } from '@mui/icons-material';

const ClientsProgress = () => {
  const [clients, setClients] = useState([
    { name: 'Client A', progress: 60, status: 'In Progress', deadline: '2024-10-01' },
    { name: 'Client B', progress: 30, status: 'Onboarding', deadline: '2024-09-30' },
    { name: 'Client C', progress: 100, status: 'Completed', deadline: '2024-09-20' }
  ]);
  
  const [editIndex, setEditIndex] = useState(null);
  const [editedClient, setEditedClient] = useState(null);

  // Handle change in progress or other client info
  const handleEditChange = (e) => {
    setEditedClient({ ...editedClient, [e.target.name]: e.target.value });
  };

  // Save changes to the client's progress and status
  const saveChanges = (index) => {
    const updatedClients = clients.map((client, idx) =>
      idx === index ? editedClient : client
    );
    setClients(updatedClients);
    setEditIndex(null);
  };

  // Mark client as complete (sets progress to 100%)
  const markComplete = (index) => {
    const updatedClients = clients.map((client, idx) =>
      idx === index ? { ...client, progress: 100, status: 'Completed' } : client
    );
    setClients(updatedClients);
  };

  return (
    <div>
      <Typography variant="h4" gutterBottom>Clients' Progress</Typography>

      <Grid container spacing={3}>
        {clients.map((client, index) => (
          <Grid item xs={12} md={6} key={index}>
            <Card>
              <CardContent>
                <Typography variant="h6">{client.name}</Typography>
                <LinearProgress variant="determinate" value={client.progress} />
                <Typography variant="body2">Progress: {client.progress}%</Typography>

                <Typography variant="body2">Status: {client.status}</Typography>
                <Typography variant="body2">Deadline: {client.deadline}</Typography>

                {editIndex === index ? (
                  <div>
                    <TextField
                      label="Progress"
                      type="number"
                      name="progress"
                      value={editedClient.progress}
                      onChange={handleEditChange}
                      fullWidth
                    />
                    <Select
                      label="Status"
                      name="status"
                      value={editedClient.status}
                      onChange={handleEditChange}
                      fullWidth
                    >
                      <MenuItem value="Onboarding">Onboarding</MenuItem>
                      <MenuItem value="In Progress">In Progress</MenuItem>
                      <MenuItem value="Completed">Completed</MenuItem>
                    </Select>
                    <Button onClick={() => saveChanges(index)} variant="contained" color="primary" startIcon={<Done />}>
                      Save
                    </Button>
                  </div>
                ) : (
                  <div>
                    <Button onClick={() => setEditIndex(index) || setEditedClient(client)} variant="outlined" startIcon={<Edit />}>
                      Edit
                    </Button>
                    {client.progress < 100 && (
                      <Button onClick={() => markComplete(index)} variant="contained" color="secondary">
                        Mark as Complete
                      </Button>
                    )}
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

export default ClientsProgress;
