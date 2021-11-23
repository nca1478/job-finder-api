// Dependencies
import { check, oneOf } from 'express-validator'

/**
 * Validate body request of create user endpoint (POST /sectors)
 * @return	{Array}		Rules of validation (express-validator)
 */
const createSectorValidation = () => {
    return [check('name').exists().withMessage('Name is required')]
}

export { createSectorValidation }
