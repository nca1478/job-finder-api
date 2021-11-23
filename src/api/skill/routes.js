// Validate Data
import { createSkillValidation, findByIdSkillValidation } from './validateData'

// Helpers
import { showValErrors } from '../../middlewares/showValErrors'

class SkillRouter {
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

        // Create New Skill
        this.router.post(
            '/',
            [createSkillValidation(), showValErrors],
            this.controller.create.bind(this.controller),
        )

        // Get Skills
        this.router.get('/', this.controller.findAll.bind(this.controller))

        // Delete Skill
        this.router.delete('/:id', this.controller.delete.bind(this.controller))
    }

    setRoutes() {
        return this.router
    }
}

export default SkillRouter
