// routes/clients.js
const express = require('express');
const router = express.Router();
const { getClients, addClient } = require('../controllers/clientsController');

router.get('/', getClients);
router.post('/', addClient);

module.exports = router;
