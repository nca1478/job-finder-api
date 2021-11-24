// Queries
import { queryOffersList, queryOfferById, queryOffersPublished } from './querys'

class OfferService {
    constructor(dependenciesData) {
        this.error = new Error()

        if (!dependenciesData.offer) {
            this.error.dependencyError = 'Offer Model is undefined'
            throw this.error.dependencyError
        } else {
            this.offer = dependenciesData.offer
        }
    }

    async createOffer(userId, data) {
        const dataOffer = { ...data, userId }
        try {
            const result = await this.offer.create(dataOffer)
            return result
        } catch (err) {
            throw err
        }
    }

    async findOffers() {
        const query = queryOffersList()
        return await this.offer.findAll(query)
    }

    async findOfferById(id) {
        const query = queryOfferById(id)
        return this.offer.findOne(query)
    }

    async updateOffer(id, dataOffer) {
        try {
            let result = await this.offer.update({ ...dataOffer }, { where: { id } })
            return result
        } catch (err) {
            throw err
        }
    }

    async findOffersPublished(status) {
        const query = queryOffersPublished(status)
        return await this.offer.findAll(query)
    }

    async publishOffer(id, status) {
        try {
            let result = await this.offer.update({ published: status }, { where: { id } })
            return result
        } catch (err) {
            throw err
        }
    }

    async deleteOffer(id) {
        try {
            let result = await this.offer.update({ active: false }, { where: { id } })
            return result
        } catch (err) {
            throw err
        }
    }
}

export default OfferService
