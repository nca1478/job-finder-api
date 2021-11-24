// Dependencies
import { check, oneOf } from 'express-validator'

// Helpers
import { offerExistsById, offerExistsByState } from '../../helpers/dbValidators'

/**
 * Validate body request of create user endpoint (POST /offers)
 * @return	{Array}		Rules of validation (express-validator)
 */
const createOfferValidation = () => {
    return [
        check('title').exists().withMessage('Title is required'),
        check('description').exists().withMessage('Description is required'),
        check('country').exists().withMessage('Country is required'),
        check('city').exists().withMessage('City is required'),
        check('state').exists().withMessage('State is required'),
        check('experience').exists().withMessage('Experience is required'),
        check('contract').exists().withMessage('Contract is required'),
        check('payment').exists().withMessage('Payment is required'),
        check('period').exists().withMessage('Period is required'),
        check('currency').exists().withMessage('Currency is required'),
    ]
}

/**
 * Validate body request of get user endpoint (GET /offers/:id)
 * @return	{Array}		Rules of validation (express-validator)
 */
const findByIdOfferValidation = () => {
    return [
        check('id', 'Is not a correct UUID').isUUID(),
        check('id').custom(offerExistsById),
        check('id').custom(offerExistsByState),
    ]
}

export { createOfferValidation, findByIdOfferValidation }
