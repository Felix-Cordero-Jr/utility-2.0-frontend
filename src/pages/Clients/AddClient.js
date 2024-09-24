import React, { useState } from 'react';
import { TextField, Button, Grid, MenuItem, Typography, Snackbar, Select, FormControl, InputLabel } from '@mui/material';

const AddClient = () => {
  const [clientData, setClientData] = useState({
    name: '',
    email: '',
    phone: '',
    clientType: 'Individual', // Default selection
    companyName: '',
    companyIndustry: '',
    notes: '',
  });
  const [formErrors, setFormErrors] = useState({});
  const [showSnackbar, setShowSnackbar] = useState(false);

  const clientTypes = ['Individual', 'Company'];
  const industries = ['Technology', 'Finance', 'Healthcare', 'Education', 'Other'];

  // Handle input change
  const handleChange = (e) => {
    setClientData({ ...clientData, [e.target.name]: e.target.value });
  };

  // Form validation
  const validateForm = () => {
    let errors = {};
    if (!clientData.name) errors.name = 'Name is required';
    if (!clientData.email || !/\S+@\S+\.\S+/.test(clientData.email)) {
      errors.email = 'Valid email is required';
    }
    if (!clientData.phone || !/^\d{10}$/.test(clientData.phone)) {
      errors.phone = 'Valid 10-digit phone number is required';
    }
    if (clientData.clientType === 'Company' && !clientData.companyName) {
      errors.companyName = 'Company name is required for companies';
    }
    return errors;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validateForm();
    if (Object.keys(errors).length === 0) {
      console.log('Client data submitted:', clientData);
      setShowSnackbar(true); // Show success notification
      setClientData({
        name: '',
        email: '',
        phone: '',
        clientType: 'Individual',
        companyName: '',
        companyIndustry: '',
        notes: '',
      });
    } else {
      setFormErrors(errors);
    }
  };

  return (
    <div>
      <Typography variant="h4" gutterBottom>Add Client</Typography>
      
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          {/* Name field */}
          <Grid item xs={12} sm={6}>
            <TextField
              label="Name"
              name="name"
              value={clientData.name}
              onChange={handleChange}
              error={!!formErrors.name}
              helperText={formErrors.name}
              fullWidth
              required
            />
          </Grid>

          {/* Email field */}
          <Grid item xs={12} sm={6}>
            <TextField
              label="Email"
              name="email"
              type="email"
              value={clientData.email}
              onChange={handleChange}
              error={!!formErrors.email}
              helperText={formErrors.email}
              fullWidth
              required
            />
          </Grid>

          {/* Phone number field */}
          <Grid item xs={12} sm={6}>
            <TextField
              label="Phone"
              name="phone"
              value={clientData.phone}
              onChange={handleChange}
              error={!!formErrors.phone}
              helperText={formErrors.phone}
              fullWidth
              required
            />
          </Grid>

          {/* Client type dropdown */}
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel>Client Type</InputLabel>
              <Select
                name="clientType"
                value={clientData.clientType}
                onChange={handleChange}
                fullWidth
              >
                {clientTypes.map((type) => (
                  <MenuItem key={type} value={type}>
                    {type}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          {/* Company name field - only shown if Client Type is "Company" */}
          {clientData.clientType === 'Company' && (
            <>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Company Name"
                  name="companyName"
                  value={clientData.companyName}
                  onChange={handleChange}
                  error={!!formErrors.companyName}
                  helperText={formErrors.companyName}
                  fullWidth
                />
              </Grid>

              {/* Company industry dropdown */}
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel>Industry</InputLabel>
                  <Select
                    name="companyIndustry"
                    value={clientData.companyIndustry}
                    onChange={handleChange}
                    fullWidth
                  >
                    {industries.map((industry) => (
                      <MenuItem key={industry} value={industry}>
                        {industry}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            </>
          )}

          {/* Notes field */}
          <Grid item xs={12}>
            <TextField
              label="Additional Notes"
              name="notes"
              value={clientData.notes}
              onChange={handleChange}
              multiline
              rows={3}
              fullWidth
            />
          </Grid>

          {/* Submit button */}
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary">
              Add Client
            </Button>
          </Grid>
        </Grid>
      </form>

      {/* Snackbar for feedback */}
      <Snackbar
        open={showSnackbar}
        autoHideDuration={6000}
        onClose={() => setShowSnackbar(false)}
        message="Client added successfully!"
      />
    </div>
  );
};

export default AddClient;
