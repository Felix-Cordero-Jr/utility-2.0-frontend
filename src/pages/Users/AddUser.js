import React, { useState } from 'react';
import { TextField, Button, Grid, Typography, MenuItem, Snackbar, IconButton } from '@mui/material';
import { AddCircle, Delete } from '@mui/icons-material';

const AddUser = () => {
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    phone: '',
    role: '',
    department: '',
    additionalContacts: [{ type: 'email', value: '' }]
  });
  const [formErrors, setFormErrors] = useState({});
  const [showSnackbar, setShowSnackbar] = useState(false);

  const roles = ['Admin', 'Manager', 'Employee'];
  const departments = ['Sales', 'Marketing', 'Engineering', 'HR', 'Operations'];

  // Handle input change
  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  // Handle additional contact change
  const handleContactChange = (index, e) => {
    const updatedContacts = userData.additionalContacts.map((contact, idx) =>
      idx === index ? { ...contact, [e.target.name]: e.target.value } : contact
    );
    setUserData({ ...userData, additionalContacts: updatedContacts });
  };

  // Add a new additional contact field
  const addContact = () => {
    setUserData({ ...userData, additionalContacts: [...userData.additionalContacts, { type: 'email', value: '' }] });
  };

  // Remove additional contact
  const removeContact = (index) => {
    const updatedContacts = userData.additionalContacts.filter((_, idx) => idx !== index);
    setUserData({ ...userData, additionalContacts: updatedContacts });
  };

  // Form validation
  const validateForm = () => {
    let errors = {};
    if (!userData.name) errors.name = 'Name is required';
    if (!userData.email || !/\S+@\S+\.\S+/.test(userData.email)) {
      errors.email = 'Valid email is required';
    }
    if (!userData.role) errors.role = 'Role is required';
    return errors;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validateForm();
    if (Object.keys(errors).length === 0) {
      // Simulate adding user (e.g., API call)
      console.log('User data submitted:', userData);
      setShowSnackbar(true); // Show success notification
      setUserData({
        name: '',
        email: '',
        phone: '',
        role: '',
        department: '',
        additionalContacts: [{ type: 'email', value: '' }]
      });
    } else {
      setFormErrors(errors);
    }
  };

  return (
    <div>
      <Typography variant="h4" gutterBottom>Add a User</Typography>

      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          {/* User Name */}
          <Grid item xs={12} sm={6}>
            <TextField
              label="Name"
              name="name"
              value={userData.name}
              onChange={handleChange}
              error={!!formErrors.name}
              helperText={formErrors.name}
              fullWidth
              required
            />
          </Grid>

          {/* Email */}
          <Grid item xs={12} sm={6}>
            <TextField
              label="Email"
              name="email"
              value={userData.email}
              onChange={handleChange}
              error={!!formErrors.email}
              helperText={formErrors.email}
              fullWidth
              required
            />
          </Grid>

          {/* Phone Number */}
          <Grid item xs={12} sm={6}>
            <TextField
              label="Phone Number"
              name="phone"
              value={userData.phone}
              onChange={handleChange}
              fullWidth
            />
          </Grid>

          {/* Role */}
          <Grid item xs={12} sm={6}>
            <TextField
              label="Role"
              name="role"
              select
              value={userData.role}
              onChange={handleChange}
              error={!!formErrors.role}
              helperText={formErrors.role}
              fullWidth
              required
            >
              {roles.map((role) => (
                <MenuItem key={role} value={role}>
                  {role}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          {/* Department */}
          <Grid item xs={12} sm={6}>
            <TextField
              label="Department"
              name="department"
              select
              value={userData.department}
              onChange={handleChange}
              fullWidth
            >
              {departments.map((department) => (
                <MenuItem key={department} value={department}>
                  {department}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          {/* Additional Contact Information */}
          <Typography variant="h6" style={{ marginTop: '20px' }}>Additional Contact Information</Typography>

          {userData.additionalContacts.map((contact, index) => (
            <Grid container spacing={2} key={index} style={{ marginBottom: '10px' }}>
              <Grid item xs={12} sm={5}>
                <TextField
                  label="Type (e.g., Secondary Email, Work Phone)"
                  name="type"
                  value={contact.type}
                  onChange={(e) => handleContactChange(index, e)}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={5}>
                <TextField
                  label="Value"
                  name="value"
                  value={contact.value}
                  onChange={(e) => handleContactChange(index, e)}
                  fullWidth
                />
              </Grid>
              {index > 0 && (
                <Grid item xs={12} sm={2}>
                  <IconButton onClick={() => removeContact(index)} color="secondary">
                    <Delete />
                  </IconButton>
                </Grid>
              )}
            </Grid>
          ))}

          {/* Add Another Contact Button */}
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
              Add User
            </Button>
          </Grid>
        </Grid>
      </form>

      {/* Snackbar for success notification */}
      <Snackbar
        open={showSnackbar}
        autoHideDuration={6000}
        onClose={() => setShowSnackbar(false)}
        message="User added successfully!"
      />
    </div>
  );
};

export default AddUser;
