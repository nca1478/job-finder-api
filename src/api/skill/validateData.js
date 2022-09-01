// Dependencies
import { check, oneOf } from 'express-validator'

/**
 * Validate body request of create user endpoint (POST /skills)
 * @return	{Array}		Rules of validation (express-validator)
 */
const createSkillValidation = () => {
    return [check('name').exists().withMessage('El nombre es requerido')]
}

export { createSkillValidation }
