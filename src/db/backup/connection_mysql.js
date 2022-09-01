// Dependencies
import Sequelize from 'sequelize'

// DB Connection Values
import { config } from '../config/env'
const { dbName, dbUser, dbPass, dbHost } = config

// DB Connection (MySQL)
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

module.exports = sequelize
