// Dependencies
import express from 'express'

// DB Connection
import Skill from './model'

// User Dependencies
import SkillController from './controller'
import SkillRouter from './routes'

const dataDependencies = { skill: Skill }

// Injecting Dependencies
const router = express.Router()
const skillController = new SkillController(dataDependencies)
const skillRouter = new SkillRouter(router, skillController)
const skillRoutes = skillRouter.setRoutes()

export { skillRoutes }
