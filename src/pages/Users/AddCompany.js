import React, { useState } from 'react';
import { TextField, Button, Grid, Typography, MenuItem, Snackbar, IconButton } from '@mui/material';
import { AddCircle, Delete } from '@mui/icons-material';

const AddCompany = () => {
  const [companyData, setCompanyData] = useState({
    name: '',
    industry: '',
    size: '',
    contacts: [{ name: '', email: '', phone: '' }],
    address: '',
  });
  const [formErrors, setFormErrors] = useState({});
  const [showSnackbar, setShowSnackbar] = useState(false);

  const industries = ['Technology', 'Finance', 'Healthcare', 'Education', 'Manufacturing'];
  const companySizes = ['1-10', '11-50', '51-200', '201-500', '500+'];

  // Handle input change
  const handleChange = (e) => {
    setCompanyData({ ...companyData, [e.target.name]: e.target.value });
  };

  // Handle contact input change
  const handleContactChange = (index, e) => {
    const updatedContacts = companyData.contacts.map((contact, idx) =>
      idx === index ? { ...contact, [e.target.name]: e.target.value } : contact
    );
    setCompanyData({ ...companyData, contacts: updatedContacts });
  };

  // Add a new contact field
  const addContact = () => {
    setCompanyData({ ...companyData, contacts: [...companyData.contacts, { name: '', email: '', phone: '' }] });
  };

  // Remove a contact
  const removeContact = (index) => {
    const updatedContacts = companyData.contacts.filter((_, idx) => idx !== index);
    setCompanyData({ ...companyData, contacts: updatedContacts });
  };

  // Form validation
  const validateForm = () => {
    let errors = {};
    if (!companyData.name) errors.name = 'Company name is required';
    if (!companyData.industry) errors.industry = 'Industry is required';
    if (!companyData.contacts[0].email || !/\S+@\S+\.\S+/.test(companyData.contacts[0].email)) {
      errors.email = 'Valid email is required for the main contact';
    }
    return errors;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validateForm();
    if (Object.keys(errors).length === 0) {
      // Simulate adding company (e.g., API call)
      console.log('Company data submitted:', companyData);
      setShowSnackbar(true); // Show success notification
      setCompanyData({
        name: '',
        industry: '',
        size: '',
        contacts: [{ name: '', email: '', phone: '' }],
        address: '',
      });
    } else {
      setFormErrors(errors);
    }
  };

  return (
    <div>
      <Typography variant="h4" gutterBottom>Add a Company</Typography>

      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          {/* Company Name */}
          <Grid item xs={12} sm={6}>
            <TextField
              label="Company Name"
              name="name"
              value={companyData.name}
              onChange={handleChange}
              error={!!formErrors.name}
              helperText={formErrors.name}
              fullWidth
              required
            />
          </Grid>

          {/* Industry */}
          <Grid item xs={12} sm={6}>
            <TextField
              label="Industry"
              name="industry"
              select
              value={companyData.industry}
              onChange={handleChange}
              error={!!formErrors.industry}
              helperText={formErrors.industry}
              fullWidth
              required
            >
              {industries.map((industry) => (
                <MenuItem key={industry} value={industry}>
                  {industry}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          {/* Company Size */}
          <Grid item xs={12} sm={6}>
            <TextField
              label="Company Size"
              name="size"
              select
              value={companyData.size}
              onChange={handleChange}
              fullWidth
            >
              {companySizes.map((size) => (
                <MenuItem key={size} value={size}>
                  {size}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          {/* Address */}
          <Grid item xs={12}>
            <TextField
              label="Company Address"
              name="address"
              value={companyData.address}
              onChange={handleChange}
              fullWidth
            />
          </Grid>

          {/* Contact Information */}
          <Typography variant="h6" style={{ marginTop: '20px' }}>Contact Information</Typography>

          {companyData.contacts.map((contact, index) => (
            <Grid container spacing={2} key={index} style={{ marginBottom: '10px' }}>
              <Grid item xs={12} sm={4}>
                <TextField
                  label="Contact Name"
                  name="name"
                  value={contact.name}
                  onChange={(e) => handleContactChange(index, e)}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  label="Email"
                  name="email"
                  value={contact.email}
                  onChange={(e) => handleContactChange(index, e)}
                  fullWidth
                  error={!!formErrors.email && index === 0}
                  helperText={index === 0 && formErrors.email}
                  required={index === 0}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  label="Phone"
                  name="phone"
                  value={contact.phone}
                  onChange={(e) => handleContactChange(index, e)}
                  fullWidth
                />
              </Grid>
              {index > 0 && (
                <Grid item xs={12} sm={1}>
                  <IconButton onClick={() => removeContact(index)} color="secondary">
                    <Delete />
                  </IconButton>
                </Grid>
              )}
            </Grid>
          ))}

          {/* Add Contact Button */}
          <Grid item xs={12}>
            <Button
              variant="outlined"
              startIcon={<AddCircle />}
              onClick={addContact}
              fullWidth
            >
              Add Another Contact
            </Button>
          </Grid>

          {/* Submit Button */}
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Add Company
            </Button>
          </Grid>
        </Grid>
      </form>

      {/* Snackbar for success notification */}
      <Snackbar
        open={showSnackbar}
        autoHideDuration={6000}
        onClose={() => setShowSnackbar(false)}
        message="Company added successfully!"
      />
    </div>
  );
};

export default AddCompany;
