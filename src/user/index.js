// Dependencies
import express from 'express'

// DB Connection
import { User, sequelize } from '../db/connection'

// User Dependencies
import UserController from './controller'
import UserRouter from './routes'

const dataDependencies = {
    user: User,
    sequelize,
}

// Injecting Dependencies
const router = express.Router()
const userController = new UserController(dataDependencies)
const userRouter = new UserRouter(router, userController)
const userRoutes = userRouter.setRoutes()

export { userRoutes }
