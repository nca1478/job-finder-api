const queryUsersList = () => {
    return {
        where: { active: true },
        order: [['name', 'ASC']],
        attributes: { exclude: ['password'] },
        // include: [
        //     {
        //         model: skill,
        //         as: 'skills',
        //         attributes: { exclude: ['skillId'] },
        //         required: true,
        //         through: {
        //             model: userSkill,
        //             as: 'userSkill',
        //             attributes: [],
        //         },
        //     },
        // ],
    }
}

const queryUserById = id => {
    return {
        where: { id, active: true },
        attributes: { exclude: ['password'] },
        // include: [
        //     {
        //         model: skill,
        //         as: 'skills',
        //         attributes: { exclude: ['skillId'] },
        //         required: true,
        //         through: {
        //             model: userSkill,
        //             as: 'userSkill',
        //             attributes: [],
        //         },
        //     },
        // ],
    }
}

const querySendEmailRecovery = email => {
    return {
        where: {
            email,
            active: true,
            google: false,
            facebook: false,
        },
    }
}

const queryRecoveryPassword = (email, token) => {
    return {
        where: { email, tokenRecovery: token, active: true },
    }
}

export { queryUsersList, queryUserById, querySendEmailRecovery, queryRecoveryPassword }
