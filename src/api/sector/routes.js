// Validate Data
import { createSectorValidation } from './validateData'

// Helpers
import { showValErrors } from '../../middlewares/showValErrors'

class SectorRouter {
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

        // Create New Sector
        this.router.post(
            '/',
            [createSectorValidation(), showValErrors],
            this.controller.create.bind(this.controller),
        )

        // Get Sectors
        this.router.get('/', this.controller.findAll.bind(this.controller))

        // Get Sector by ID
        this.router.get('/:id', this.controller.findById.bind(this.controller))

        // Update Sector
        this.router.put('/:id/update', this.controller.update.bind(this.controller))

        // Delete Sector
        this.router.delete('/:id', this.controller.delete.bind(this.controller))
    }

    setRoutes() {
        return this.router
    }
}

export default SectorRouter
