const querySkillsList = () => {
    return {
        where: { active: true },
        order: [['name', 'ASC']],
    }
}

export { querySkillsList }
