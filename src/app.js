// Dependencies
import path from 'path'
require('dotenv').config({ path: path.join(__dirname, '../.env') })

// Start Server
const Server = require('./server')
const server = new Server()
server.listen()
