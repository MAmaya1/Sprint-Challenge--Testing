// Imports

const express = require('express');
const helmet = require('helmet');

const server = express();

// Import Routers

const gamesRouter = require('../games/games-router');

// Middleware

server.use(express.json());
server.use(helmet());

// Configure Routes

server.get('/', (req, res) => {
    res.status(200).json({ api: 'Good to go!'});
})

server.use('/api/games', gamesRouter);

module.exports = server;