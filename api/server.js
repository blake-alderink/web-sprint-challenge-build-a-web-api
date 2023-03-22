const express = require('express');
const server = express();
const projectRoutes = require('./projects/projects-router')
const actionRoutes = require('./actions/actions-router')

server.use(express.json());
server.use('/api/projects', projectRoutes)
server.use('/api/actions', actionRoutes)
// Configure your server here
// Build your actions router in /api/actions/actions-router.js
// Build your projects router in /api/projects/projects-router.js
// Do NOT `server.listen()` inside this file!
// server.get('/', (req, res) => {
//     res.send(`<h2>Let's write some middleware!</h2>`);
//   });



module.exports = server;
