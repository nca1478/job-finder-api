const querySectorsList = paginationData => {
    const { limit, skip } = paginationData
    return {
        where: { active: true },
        order: [['name', 'ASC']],
        distinct: true,
        limit,
        offset: skip,
    }
}

const querySectorById = id => {
    return {
        where: { id, active: true },
    }
}

export { querySectorsList, querySectorById }
