// Dependencies
import { check, oneOf } from 'express-validator'

// Helpers
import { userExistsByEmail, userExistsById, userExistsByState } from '../../helpers/dbValidators'

/**
 * Validate body request of create user endpoint (POST /users)
 * @return	{Array}		Rules of validation (express-validator)
 */
const createUserValidation = () => {
    return [
        check('name').exists().withMessage('El nombre es requerido'),
        check('email').exists().withMessage('El email es requerido'),
        check('email').isEmail().normalizeEmail().withMessage('Debe ser un email válido'),
        check('email').custom(userExistsByEmail),
        check('password').exists().withMessage('La contraseña es requerida'),
        check('password')
            .matches(/^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z!"#$%&()=?¿*-_.:,;+^\\-`.+,/]{8,}$/)
            .withMessage('La contraseña debe contener al menos 8 caracteres y al menos 1 número'),
    ]
}

/**
 * Validate body request of get user endpoint (GET /users/:id)
 * @return	{Array}		Rules of validation (express-validator)
 */
const findByIdUserValidation = () => {
    return [
        check('id', 'No es un UUID correcto').isUUID(),
        check('id').custom(userExistsById),
        check('id').custom(userExistsByState),
    ]
}

/**
 * Validate body request of update user endpoint (PUT /users/:id)
 * @return	{Array}		Rules of validation (express-validator)
 */
const updateUserValidation = () => {
    return [
        check('name').exists().withMessage('El nombre es requerido'),
        check('email').exists().withMessage('El email es requerido'),
        check('email').isEmail().normalizeEmail().withMessage('Debe ser un email válido'),
    ]
}

/**
 * Validate body request of login user endpoint (POST /users/login)
 * @return	{Array}		Rules of validation (express-validator)
 */
const loginUserValidation = () => {
    return [
        check('email').exists().withMessage('El email es requerido'),
        check('email').isEmail().normalizeEmail().withMessage('Debe ser un email válido'),
        check('password').exists().withMessage('La contraseña es requerida'),
    ]
}

/**
 * Validate body request of login user endpoint (POST /users/google)
 * @return	{Array}		Rules of validation (express-validator)
 */
const loginGoogleValidation = () => {
    return [check('tokenId').exists().withMessage('Google tokenId es requerido')]
}

/**
 * Validate body request of login user endpoint (POST /users/facebook)
 * @return	{Array}		Rules of validation (express-validator)
 */
const loginFacebookValidation = () => {
    return [
        check('accessToken').exists().withMessage('Facebook accessToken es requerido'),
        check('userID').exists().withMessage('Facebook userID es requerido'),
    ]
}

/**
 * Validate body request of login user endpoint (POST /users/recovery)
 * @return	{Array}		Rules of validation (express-validator)
 */
const emailRecoveryValidation = () => {
    return [
        check('email').exists().withMessage('El email es requerido'),
        check('email').isEmail().normalizeEmail().withMessage('Debe ser un email válido'),
    ]
}

/**
 * Validate body request of recovery password (POST /users/recovery/:token)
 * @return	{Array}		Rules of validation (express-validator)
 */
const recoveryPassValidation = () => {
    return [
        check('email').exists().withMessage('El email es requerido'),
        check('newPassword').exists().withMessage('Nueva contraseña es requerida'),
        check('newPassword')
            .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!"#$%&()=?¿*-_.:,;+^\\-`.+,/]{8,}$/)
            .withMessage('La contraseña debe contener al menos 8 caracteres y al menos 1 número'),
    ]
}

/**
 * Validate body request of get user endpoint (PUT /users/:id/upload)
 * @return	{Array}		Rules of validation (express-validator)
 */
const uploadPdfValidation = () => {
    return [check('id', 'No es un UUID correcto').isUUID()]
}

export {
    createUserValidation,
    findByIdUserValidation,
    updateUserValidation,
    loginUserValidation,
    emailRecoveryValidation,
    recoveryPassValidation,
    loginGoogleValidation,
    loginFacebookValidation,
    uploadPdfValidation,
}
