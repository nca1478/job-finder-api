const queryOffersList = userId => {
    return {
        where: { userId, active: true },
        order: [['title', 'ASC']],
    }
}

const queryOffersPublished = (status, userId) => {
    return {
        where: { published: status, userId, active: true },
        order: [['title', 'ASC']],
    }
}

const queryOfferById = (offerId, userId) => {
    return {
        where: { id: offerId, userId, active: true },
    }
}

export { queryOffersList, queryOfferById, queryOffersPublished }
