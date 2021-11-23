// Validate Data
import {
    createUserValidation,
    findByIdUserValidation,
    updateUserValidation,
    loginUserValidation,
    emailRecoveryValidation,
    recoveryPassValidation,
} from './validateData'

// Helpers
import { showValErrors } from '../../middlewares/showValErrors'
import { verifyToken, accountToken } from '../../helpers/jwtHandler'

class UserRouter {
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

        // Create New User
        this.router.post(
            '/',
            [createUserValidation(), showValErrors],
            this.controller.create.bind(this.controller),
        )

        // Get Users
        this.router.get('/', [verifyToken], this.controller.findAll.bind(this.controller))

        // Get User by ID
        this.router.get(
            '/:id',
            [verifyToken, findByIdUserValidation(), showValErrors],
            this.controller.findById.bind(this.controller),
        )

        // Update User
        this.router.put(
            '/update/:id',
            [verifyToken, updateUserValidation(), showValErrors],
            this.controller.update.bind(this.controller),
        )

        // Delete User
        this.router.delete(
            '/:id',
            [verifyToken, findByIdUserValidation(), showValErrors],
            this.controller.delete.bind(this.controller),
        )

        // Login User
        this.router.post(
            '/login',
            [loginUserValidation(), showValErrors],
            this.controller.login.bind(this.controller),
        )

        // Send Email to Recover Password
        this.router.put(
            '/recovery',
            [emailRecoveryValidation(), showValErrors],
            this.controller.sendEmailRecovery.bind(this.controller),
        )

        // Recover password
        this.router.put(
            '/recovery/:token',
            [recoveryPassValidation(), accountToken, showValErrors],
            this.controller.recoveryPass.bind(this.controller),
        )
    }

    setRoutes() {
        return this.router
    }
}

export default UserRouter