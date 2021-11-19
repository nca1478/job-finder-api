// Dependencies
import chalk from 'chalk'
import Sequelize from 'sequelize'
const debug = require('debug')('freelanceFinder:DB')

// Enviroments Vars
import { config } from '../config/env'

// Models
import { setModels } from './models'
const { dbName, dbUser, dbPass, dbHost } = config

// DB Connection
const sequelize = new Sequelize(dbName, dbUser, dbPass, {
    host: dbHost,
    dialect: 'mysql',
    pool: {
        max: 10,
        min: 0,
        acquire: 30000,
        idle: 10000,
    },
    logging: false,
})

// Set DB Models & Relationships
const models = setModels(sequelize)

// Creating Tables on DB (force: true)
sequelize
    .sync({ force: false })
    .then(() => {
        debug('Database connection succesfully')
        console.log(`${chalk.yellow('[freelanceFinder:DB]')} Database connection succesfully`)
    })
    .catch(error => {
        console.log(error)
        console.log(`${chalk.red('[freelanceFinder:DB]')} Database connection error ${error}`)
    })

module.exports = models
