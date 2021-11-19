// Dependencies
import Sequelize from 'sequelize'
const Op = Sequelize.Op

const queryUsersList = () => {
    return {
        where: { active: true },
        order: [['name', 'ASC']],
        attributes: {
            exclude: ['password'],
        },
    }
}

const queryUserById = id => {
    return {
        where: { id, active: true },
        attributes: { exclude: ['password'] },
    }
}

export { queryUsersList, queryUserById }
