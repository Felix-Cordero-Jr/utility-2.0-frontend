// server.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { Pool } = require('pg'); // PostgreSQL connection

const app = express();
const port = process.env.PORT || 5000;

// PostgreSQL configuration (replace with your DB credentials)
const pool = new Pool({
  user: 'your_db_user',
  host: 'your_db_host',
  database: 'your_db_name',
  password: 'your_db_password',
  port: 5432,
});

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Endpoint to store client inquiry
app.post('/api/inquiries', async (req, res) => {
  const { firstName, lastName, email, phone, companyName, businessType, address, city, state, zip } = req.body;
  try {
    const query = `INSERT INTO inquiries (first_name, last_name, email, phone, company_name, business_type, address, city, state, zip) 
                    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *`;
    const values = [firstName, lastName, email, phone, companyName, businessType, address, city, state, zip];
    const result = await pool.query(query, values);
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error saving inquiry:', error);
    res.status(500).send('Server error');
  }
});

// Endpoint to retrieve client inquiry by email (or any other identifier)
app.get('/api/inquiries/:email', async (req, res) => {
  const { email } = req.params;
  try {
    const query = 'SELECT * FROM inquiries WHERE email = $1';
    const result = await pool.query(query, [email]);
    if (result.rows.length === 0) {
      return res.status(404).send('Client not found');
    }
    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error('Error fetching inquiry:', error);
    res.status(500).send('Server error');
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
