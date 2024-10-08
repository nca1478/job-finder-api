// Dependencies
import express from 'express'
import logger from 'morgan'
import chalk from 'chalk'
import cors from 'cors'
import fileUpload from 'express-fileupload'

// Debugging utility
const debug = require('debug')('jobFinder:DB')

// Api Routes
import { userRoutes } from '../api/user'
import { skillRoutes } from '../api/skill'
import { sectorRoutes } from '../api/sector'
import { offerRoutes } from '../api/offer'

// DB Connection and Associations
import sequelize from '../db/connection'
require('../db/associations')

class Server {
    constructor() {
        this.app = express()
        this.port = process.env.PORT
        this.dbSync = process.env.DBSYNC === 'true'

        // Settings App
        this.middlewares()
        this.routes()
    }

    middlewares() {
        // Cors Access
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

        // Fileupload
        this.app.use(
            fileUpload({
                useTempFiles: true,
                tempFileDir: '/tmp/',
                createParentPath: true,
            }),
        )
    }

    routes() {
        this.app.use('/api/v1/users', userRoutes)
        this.app.use('/api/v1/skills', skillRoutes)
        this.app.use('/api/v1/sectors', sectorRoutes)
        this.app.use('/api/v1/offers', offerRoutes)
    }

    listen() {
        const port = process.env.PORT
        this.app.listen(port, () => {
            console.log(`${chalk.yellow('[jobFinder:API]')} Servidor iniciado en puerto ${port}`)
        })
    }

    startDBConnection() {
        sequelize
            .sync({ force: this.dbSync })
            .then(() => {
                debug('Conexión a base de datos exitosa')
                console.log(`${chalk.yellow('[jobFinder:DB]')} Conexión a base de datos exitosa`)
            })
            .catch(error => {
                console.log(error)
                console.log(
                    `${chalk.red('[jobFinder:DB]')} Error de conexión a la base de datos ${error}`,
                )
            })
    }
}

module.exports = Server
