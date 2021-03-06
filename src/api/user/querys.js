const queryUsersList = (limit, skip) => {
    return {
        where: { active: true },
        order: [['name', 'ASC']],
        attributes: { exclude: ['password'] },
        distinct: true,
        limit,
        offset: skip,
    }
}

const queryUserById = id => {
    return {
        where: { id, active: true },
        attributes: { exclude: ['password'] },
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
