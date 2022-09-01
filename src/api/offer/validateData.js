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
        check('title').exists().withMessage('El título es requerido'),
        check('description').exists().withMessage('La descripción es requerida'),
        check('country').exists().withMessage('El país es requerido'),
        check('city').exists().withMessage('La ciudad es requerida'),
        check('state').exists().withMessage('El estado es requerido'),
        check('price').exists().withMessage('El precio es requerido'),
        check('currency').exists().withMessage('La moneda es requerida'),
    ]
}

/**
 * Validate body request of get user endpoint (GET /offers/:id)
 * @return	{Array}		Rules of validation (express-validator)
 */
const findByIdOfferValidation = () => {
    return [
        check('id', 'No es un UUID correcto').isUUID(),
        check('id').custom(offerExistsById),
        check('id').custom(offerExistsByState),
    ]
}

/**
 * Validate body request of get user endpoint (PUT /offers/:id/upload)
 * @return	{Array}		Rules of validation (express-validator)
 */
const uploadImgOfferValidation = () => {
    return [check('id', 'No es un UUID correcto').isUUID()]
}

export { createOfferValidation, findByIdOfferValidation, uploadImgOfferValidation }
