// Dependencies
import express from 'express'

// Models
import Sector from './model'

// User Dependencies
import SectorController from './controller'
import SectorRouter from './routes'

const dataDependencies = { sector: Sector }

// Injecting Dependencies
const router = express.Router()
const sectorController = new SectorController(dataDependencies)
const sectorRouter = new SectorRouter(router, sectorController)
const sectorRoutes = sectorRouter.setRoutes()

export { sectorRoutes }
