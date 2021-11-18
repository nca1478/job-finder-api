// Dependencies
import express from 'express'
import logger from 'morgan'
import chalk from 'chalk'
import cors from 'cors'

class Server {
    constructor() {
        this.app = express()
        this.port = process.env.PORT

        // Settings
        this.middlewares()
    }

    middlewares() {
        this.app.use(cors())
        this.app.use(
            logger(
                ':method :url :status :response-time ms - :res[content-length] [:date[clf]] :remote-addr',
            ),
        )

        // Bodyparser
        this.app.use(express.json())
        this.app.use(express.urlencoded({ extended: false }))

        // Static Files
        this.app.use(express.static('public'))
    }

    listen() {
        const port = process.env.PORT
        this.app.listen(port, () => {
            console.log(`${chalk.yellow('[freelance-finder-api:REST]')} Listening on port ${port}`)
        })
    }
}

module.exports = Server
