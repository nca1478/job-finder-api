// Validate Data
import { createOfferValidation, findByIdOfferValidation } from './validateData'

// Helpers
import { showValErrors } from '../../middlewares/showValErrors'
import { verifyToken } from '../../helpers/jwtHandler'

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
            [verifyToken, createOfferValidation(), showValErrors],
            this.controller.create.bind(this.controller),
        )

        // Get Job Offers (Published/Unpublish)
        this.router.get(
            '/published',
            [verifyToken, showValErrors],
            this.controller.findAllbyPub.bind(this.controller),
        )

        // Get Offers
        this.router.get(
            '/',
            [verifyToken, showValErrors],
            this.controller.findAll.bind(this.controller),
        )

        // Get Offer by ID
        this.router.get(
            '/:id',
            [verifyToken, findByIdOfferValidation(), showValErrors],
            this.controller.findById.bind(this.controller),
        )

        // Update Offer
        this.router.put(
            '/:id/update',
            [verifyToken, findByIdOfferValidation(), createOfferValidation(), showValErrors],
            this.controller.update.bind(this.controller),
        )

        // Publish/Unpublish Job Offer
        this.router.put(
            '/:id/publish',
            [verifyToken, findByIdOfferValidation(), showValErrors],
            this.controller.publish.bind(this.controller),
        )

        // Delete Offer
        this.router.delete(
            '/:id',
            [verifyToken, findByIdOfferValidation(), showValErrors],
            this.controller.delete.bind(this.controller),
        )
    }

    setRoutes() {
        return this.router
    }
}

export default OfferRouter
