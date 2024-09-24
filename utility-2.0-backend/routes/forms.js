const express = require('express');
const router = express.Router();

// Define a GET route for retrieving forms
router.get('/', (req, res) => {
  res.send('List of forms');
});

// Add other routes for forms (POST, DELETE, etc.)
module.exports = router;
