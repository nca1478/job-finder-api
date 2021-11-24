const queryOffersList = () => {
    return {
        where: { active: true },
        order: [['title', 'ASC']],
    }
}

const queryOffersPublished = status => {
    return {
        where: { published: status, active: true },
        order: [['title', 'ASC']],
    }
}

const queryOfferById = id => {
    return {
        where: { id, active: true },
    }
}

export { queryOffersList, queryOfferById, queryOffersPublished }
