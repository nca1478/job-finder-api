// Dependencies
import { validationResult } from 'express-validator'

// Helpers
import { responseError } from '../helpers/response'

const showValErrors = (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(422).json(responseError(errors.array()))
    }
    next()
}

module.exports = { showValErrors }
