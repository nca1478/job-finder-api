const querySectorsList = () => {
    return {
        where: { active: true },
        order: [['name', 'ASC']],
    }
}

export { querySectorsList }
