const paginate = (page, lengthPaginate) => {
    page = Number(page)
    const limit = Number(lengthPaginate)
    const skip = page !== 0 ? (page - 1) * limit : 0
    const pagination = {
        pagination: {
            prev_page: page > 1 ? page - 1 : null,
            page: page === 0 ? 1 : page,
            next_page: page === 0 ? page + 2 : page + 1,
            length: limit,
        },
    }
    return {
        limit,
        skip,
        pagination,
    }
}

module.exports = { paginate }
