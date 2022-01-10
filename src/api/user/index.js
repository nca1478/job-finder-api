// Dependencies
import express from 'express'

// Models
import User from './model'
import Skill from '../skill/model'

// User Dependencies
import UserController from './controller'
import UserRouter from './routes'

const dataDependencies = { user: User, skill: Skill }

// Injecting Dependencies
const router = express.Router()
const userController = new UserController(dataDependencies)
const userRouter = new UserRouter(router, userController)
const userRoutes = userRouter.setRoutes()

export { userRoutes }
