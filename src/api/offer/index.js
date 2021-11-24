// Dependencies
import express from 'express'

// DB Connection
import Offer from './model'

// User Dependencies
import OfferController from './controller'
import OfferRouter from './routes'

const dataDependencies = { offer: Offer }

// Injecting Dependencies
const router = express.Router()
const offerController = new OfferController(dataDependencies)
const offerRouter = new OfferRouter(router, offerController)
const offerRoutes = offerRouter.setRoutes()

export { offerRoutes }
