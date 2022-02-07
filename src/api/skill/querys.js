const querySkillsList = paginationData => {
    const { limit, skip } = paginationData
    return {
        where: { active: true },
        order: [['name', 'ASC']],
        distinct: true,
        limit,
        offset: skip,
    }
}

const querySkillById = id => {
    return {
        where: { id, active: true },
    }
}

export { querySkillsList, querySkillById }
