import React, { useState } from 'react';
import { TextField, Button, Grid, MenuItem, Typography, Snackbar } from '@mui/material';

const InquiryForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    businessType: '',
    company: '',
    website: '',
    phone: '',
  });
  const [formErrors, setFormErrors] = useState({});
  const [showSnackBar, setShowSnackBar] = useState(false);

  const businessTypes = ['SaaS', 'E-commerce', 'Consulting', 'Other'];

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const validateForm = () => {
    let errors = {};
    if (!formData.name) errors.name = 'Name is required';
    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Valid email is required';
    }
    if (!formData.businessType) errors.businessType = 'Business Type is required';
    if (!formData.phone || !/^\d{10}$/.test(formData.phone)) {
      errors.phone = 'Valid 10-digit phone number is required';
    }
    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validateForm();
    if (Object.keys(errors).length === 0) {
      // Handle form submission
      console.log('Form submitted:', formData);
      setShowSnackBar(true);
    } else {
      setFormErrors(errors);
    }
  };

  return (
    <div>
      <Typography variant="h5">Client Inquiry Form</Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              error={!!formErrors.name}
              helperText={formErrors.name}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              error={!!formErrors.email}
              helperText={formErrors.email}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Business Type"
              name="businessType"
              select
              value={formData.businessType}
              onChange={handleChange}
              error={!!formErrors.businessType}
              helperText={formErrors.businessType}
              fullWidth
              required
            >
              {businessTypes.map((type) => (
                <MenuItem key={type} value={type}>
                  {type}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          {/* Conditional field based on Business Type */}
          {formData.businessType === 'SaaS' && (
            <Grid item xs={12}>
              <TextField
                label="Company Website"
                name="website"
                value={formData.website}
                onChange={handleChange}
                fullWidth
              />
            </Grid>
          )}
          <Grid item xs={12} sm={6}>
            <TextField
              label="Company Name"
              name="company"
              value={formData.company}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              error={!!formErrors.phone}
              helperText={formErrors.phone}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary">
              Submit
            </Button>
          </Grid>
        </Grid>
      </form>

      {/* Snackbar for feedback */}
      <Snackbar
        open={showSnackBar}
        autoHideDuration={6000}
        onClose={() => setShowSnackBar(false)}
        message="Form submitted successfully!"
      />
    </div>
  );
};

export default InquiryForm;
