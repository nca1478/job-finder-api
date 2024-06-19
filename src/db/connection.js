// Dependencies
import Sequelize from 'sequelize'

// DB Connection Values
import { config } from '../config/env'
const { dbName, dbUser, dbPass, dbHost, dbPort } = config

// DB Connection (Postgres SQL)
const sequelize = new Sequelize(dbName, dbUser, dbPass, {
    host: dbHost,
    dialect: 'postgres',
    pool: {
        max: 10,
        min: 0,
        acquire: 30000,
        idle: 10000,
    },
    port: Number(dbPort),
    logging: false,
    // dialectOptions: {
    //     ssl: {
    //         rejectUnauthorized: false,
    //     },
    // },
})

module.exports = sequelize
