const queryOffersList = (userId, user, sector, offerSector) => {
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
        ],
    }
}

const queryOfferById = (offerId, userId, user, sector, offerSector) => {
    return {
        where: { id: offerId, userId, active: true },
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
        ],
    }
}

const queryOffersPublished = (status, user, sector, offerSector) => {
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
        ],
    }
}

export { queryOffersList, queryOfferById, queryOffersPublished }
