// Dependencies
import express from 'express'

// DB Connection
import User from './model'

// User Dependencies
import UserController from './controller'
import UserRouter from './routes'

const dataDependencies = { user: User }

// Injecting Dependencies
const router = express.Router()
const userController = new UserController(dataDependencies)
const userRouter = new UserRouter(router, userController)
const userRoutes = userRouter.setRoutes()

export { userRoutes }
