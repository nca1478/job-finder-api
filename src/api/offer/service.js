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

        if (!dependenciesData.offerSector) {
            this.error.dependencyError = 'OfferSector Model is undefined'
            throw this.error.dependencyError
        } else {
            this.offerSector = dependenciesData.offerSector
        }
    }

    async createOffer({ userId, dataOffer, sectors }) {
        const data = { ...dataOffer, userId }
        try {
            const offerResponse = await this.offer.create(data)
            if (offerResponse) {
                const offerSectors = sectors.map(sector => {
                    return {
                        offerId: offerResponse.id,
                        sectorId: sector.id,
                    }
                })
                await this.offerSector.bulkCreate(offerSectors)
                return offerResponse
            } else {
                return offerResponse
            }
        } catch (err) {
            throw err
        }
    }

    async findOffers(userId) {
        const query = queryOffersList(userId)
        return await this.offer.findAll(query)
    }

    async findOfferById(offerId, userId) {
        const query = queryOfferById(offerId, userId)
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

    async findOffersPublished(status, userId) {
        const query = queryOffersPublished(status, userId)
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
