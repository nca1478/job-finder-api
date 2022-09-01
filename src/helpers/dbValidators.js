// Models
import User from '../api/user/model'
import Offer from '../api/offer/model'

const userExistsByEmail = async (email = '') => {
    const userExists = await User.findOne({ where: { email } })
    if (userExists) {
        throw new Error(`El email ${email} ya existe`)
    }
}

const userExistsById = async id => {
    const userExists = await User.findOne({ where: { id } })
    if (!userExists) {
        throw new Error(`El usuario con el ID ${id} no existe`)
    }
}

const userExistsByState = async id => {
    const userExists = await User.findOne({ where: { id, active: true } })
    if (!userExists) {
        throw new Error(`El usuario con el ID ${id} no está activo`)
    }
}

const offerExistsById = async id => {
    const offerExists = await Offer.findOne({ where: { id } })
    if (!offerExists) {
        throw new Error(`La oferta con el ID ${id} no existe`)
    }
}

const offerExistsByState = async id => {
    const offerExists = await Offer.findOne({ where: { id, active: true } })
    if (!offerExists) {
        throw new Error(`La oferta con el ID ${id} no está activa`)
    }
}

module.exports = {
    userExistsByEmail,
    userExistsById,
    userExistsByState,
    offerExistsById,
    offerExistsByState,
}
