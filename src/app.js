// Dependencies
require('dotenv').config()

// Start Server
const Server = require('./server')
const server = new Server()
server.listen()

// Start DB Connection
server.startDBConnection()
