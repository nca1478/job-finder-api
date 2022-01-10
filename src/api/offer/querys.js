import Sequelize from 'sequelize'
const Op = Sequelize.Op

const queryOffersList = (userId, user, sector, offerSector, skill, offerSkill) => {
    return {
        where: { userId, active: true },
        order: [['title', 'ASC']],
        attributes: { exclude: ['userId'] },
        include: [
            {
                model: user,
                as: 'user',
                attributes: ['id', 'name', 'email'],
            },
            {
                model: sector,
                as: 'sectors',
                attributes: { exclude: ['sectorId'] },
                required: true,
                through: {
                    model: offerSector,
                    as: 'offerSector',
                    attributes: [],
                },
            },
            {
                model: skill,
                as: 'skills',
                attributes: { exclude: ['skillId'] },
                required: true,
                through: {
                    model: offerSkill,
                    as: 'offerSkill',
                    attributes: [],
                },
            },
        ],
    }
}

const queryOfferById = (offerId, user, sector, offerSector, skill, offerSkill) => {
    return {
        where: { id: offerId, active: true },
        attributes: { exclude: ['userId'] },
        include: [
            {
                model: user,
                as: 'user',
                attributes: ['id', 'name', 'email'],
            },
            {
                model: sector,
                as: 'sectors',
                attributes: { exclude: ['sectorId'] },
                required: true,
                through: {
                    model: offerSector,
                    as: 'offerSector',
                    attributes: [],
                },
            },
            {
                model: skill,
                as: 'skills',
                attributes: { exclude: ['skillId'] },
                required: true,
                through: {
                    model: offerSkill,
                    as: 'offerSkill',
                    attributes: [],
                },
            },
        ],
    }
}

const queryLastOffers = (limit, user, sector, offerSector, skill, offerSkill) => {
    return {
        where: { published: true, active: true },
        order: [['updatedAt', 'DESC']],
        attributes: { exclude: ['userId'] },
        include: [
            {
                model: user,
                as: 'user',
                attributes: ['id', 'name', 'email'],
            },
            {
                model: sector,
                as: 'sectors',
                attributes: { exclude: ['sectorId'] },
                required: true,
                through: {
                    model: offerSector,
                    as: 'offerSector',
                    attributes: [],
                },
            },
            {
                model: skill,
                as: 'skills',
                attributes: { exclude: ['skillId'] },
                required: true,
                through: {
                    model: offerSkill,
                    as: 'offerSkill',
                    attributes: [],
                },
            },
        ],
        limit,
    }
}

const querySearchOffers = (search, user, sector, offerSector, skill, offerSkill) => {
    return {
        where: {
            title: search ? { [Op.like]: '%' + search + '%' } : { [Op.ne]: null },
            published: true,
            active: true,
        },
        order: [['title', 'ASC']],
        attributes: { exclude: ['userId'] },
        include: [
            {
                model: user,
                as: 'user',
                attributes: ['id', 'name', 'email'],
            },
            {
                model: sector,
                as: 'sectors',
                attributes: { exclude: ['sectorId'] },
                required: true,
                through: {
                    model: offerSector,
                    as: 'offerSector',
                    attributes: [],
                },
            },
            {
                model: skill,
                as: 'skills',
                attributes: { exclude: ['skillId'] },
                required: true,
                through: {
                    model: offerSkill,
                    as: 'offerSkill',
                    attributes: [],
                },
            },
        ],
    }
}

const queryOffersPublished = (status, user, sector, offerSector, skill, offerSkill) => {
    return {
        where: { published: status, active: true },
        order: [['title', 'ASC']],
        attributes: { exclude: ['userId'] },
        include: [
            {
                model: user,
                as: 'user',
                attributes: ['id', 'name', 'email'],
            },
            {
                model: sector,
                as: 'sectors',
                attributes: { exclude: ['sectorId'] },
                required: true,
                through: {
                    model: offerSector,
                    as: 'offerSector',
                    attributes: [],
                },
            },
            {
                model: skill,
                as: 'skills',
                attributes: { exclude: ['skillId'] },
                required: true,
                through: {
                    model: offerSkill,
                    as: 'offerSkill',
                    attributes: [],
                },
            },
        ],
    }
}

export { queryOffersList, queryOfferById, queryOffersPublished, querySearchOffers, queryLastOffers }
