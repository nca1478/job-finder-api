// Dependencies
import express from 'express'

// Models
import Offer from './model'
import User from '../user/model'
import Sector from '../sector/model'
import OfferSector from '../offer_sector/model'
import Skill from '../skill/model'
import OfferSkill from '../offer_skill/model'

// Offer Dependencies
import OfferController from './controller'
import OfferRouter from './routes'

const dataDependencies = {
    offer: Offer,
    user: User,
    sector: Sector,
    offerSector: OfferSector,
    skill: Skill,
    offerSkill: OfferSkill,
}

// Injecting Dependencies
const router = express.Router()
const offerController = new OfferController(dataDependencies)
const offerRouter = new OfferRouter(router, offerController)
const offerRoutes = offerRouter.setRoutes()

export { offerRoutes }
