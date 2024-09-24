// controllers/clientsController.js
const pool = require('../config/db');

// Get all clients
const getClients = async (req, res) => {
  try {
    const clients = await pool.query('SELECT * FROM clients');
    res.json(clients.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).json('Server Error');
  }
};

// Add a client
const addClient = async (req, res) => {
  const { name, email } = req.body;
  try {
    const newClient = await pool.query(
      'INSERT INTO clients (name, email) VALUES ($1, $2) RETURNING *',
      [name, email]
    );
    res.json(newClient.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).json('Server Error');
  }
};

module.exports = { getClients, addClient };
