// Validate Data
import { createOfferValidation, findByIdOfferValidation } from './validateData'

// Helpers
import { showValErrors } from '../../middlewares/showValErrors'

class OfferRouter {
    constructor(router, controller) {
        this.error = new Error()

        if (!router) {
            this.error.dependencyError = 'Express Router is undefined'
            throw this.error.dependencyError
        } else {
            this.router = router
        }

        if (!controller) {
            this.error.dependencyError = 'Controller is undefined'
            throw this.error.dependencyError
        } else {
            this.controller = controller
        }

        // Create New Job Offer
        this.router.post(
            '/',
            [createOfferValidation(), showValErrors],
            this.controller.create.bind(this.controller),
        )

        // Get Offers
        this.router.get('/', this.controller.findAll.bind(this.controller))

        // Get Offers (Published and Not Published)
        this.router.get('/published', this.controller.findAllbyPub.bind(this.controller))

        // Get Offer by ID
        this.router.get(
            '/:id',
            [findByIdOfferValidation(), showValErrors],
            this.controller.findById.bind(this.controller),
        )

        // Update Offer
        this.router.put(
            '/:id/update',
            [findByIdOfferValidation(), createOfferValidation(), showValErrors],
            this.controller.update.bind(this.controller),
        )

        // Publish/Unpublish Job Offer
        this.router.put(
            '/:id/publish',
            [findByIdOfferValidation(), showValErrors],
            this.controller.publish.bind(this.controller),
        )
    }

    setRoutes() {
        return this.router
    }
}

export default OfferRouter
