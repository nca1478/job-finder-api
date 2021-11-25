// Dependencies
import express from 'express'

// Models
import User from './model'
import UserSkill from '../user_skill/model'
import Skill from '../skill/model'

// User Dependencies
import UserController from './controller'
import UserRouter from './routes'

const dataDependencies = { user: User, userSkill: UserSkill, skill: Skill }

// Injecting Dependencies
const router = express.Router()
const userController = new UserController(dataDependencies)
const userRouter = new UserRouter(router, userController)
const userRoutes = userRouter.setRoutes()

export { userRoutes }
