// Dependencies
import path from 'path'
require('dotenv').config({ path: path.join(__dirname, '../.env') })
//require('dotenv').config()

// Start Server
const Server = require('./server')
const server = new Server()
server.listen()

// Start DB Connection
server.startDBConnection()
