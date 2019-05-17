// Imports

const express = require('express');
const helmet = require('helmet');

const server = express();

// Middleware

server.use(express.json());
server.use(helmet());

// Configure Routes

server.get('/', (req, res) => {
    res.status(200).json({ api: 'Good to go!'});
})

module.exports = server;