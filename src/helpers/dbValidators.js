// DB Connection
import User from '../api/user/model'

const userExistsByEmail = async (email = '') => {
    const userExists = await User.findOne({ where: { email } })
    if (userExists) {
        throw new Error(`Email ${email} is already exists`)
    }
}

const userExistsById = async id => {
    const userExists = await User.findOne({ where: { id } })
    if (!userExists) {
        throw new Error(`User with ID ${id} does not exists`)
    }
}

const userExistsByState = async id => {
    const userExists = await User.findOne({ where: { id, active: true } })
    if (!userExists) {
        throw new Error(`User with ID ${id} does not active`)
    }
}

module.exports = {
    userExistsByEmail,
    userExistsById,
    userExistsByState,
}
