// Queries
import { queryOffersList, queryOfferById, queryOffersPublished, querySearchOffers } from './querys'

class OfferService {
    constructor(dependenciesData) {
        this.error = new Error()

        if (!dependenciesData.offer) {
            this.error.dependencyError = 'Offer Model is undefined'
            throw this.error.dependencyError
        } else {
            this.offer = dependenciesData.offer
        }

        if (!dependenciesData.user) {
            this.error.dependencyError = 'User Model is undefined'
            throw this.error.dependencyError
        } else {
            this.user = dependenciesData.user
        }

        if (!dependenciesData.sector) {
            this.error.dependencyError = 'Sector Model is undefined'
            throw this.error.dependencyError
        } else {
            this.sector = dependenciesData.sector
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
        const query = queryOffersList(userId, this.user, this.sector, this.offerSector)
        return await this.offer.findAll(query)
    }

    async findOfferById(offerId) {
        const query = queryOfferById(offerId, this.user, this.sector, this.offerSector)
        return this.offer.findOne(query)
    }

    async searchOffers(search) {
        const query = querySearchOffers(search, this.user, this.sector, this.offerSector)
        return await this.offer.findAll(query)
    }

    async updateOffer(id, dataOffer) {
        try {
            let offerResponse = await this.offer.update({ ...dataOffer }, { where: { id } })
            if (offerResponse) {
                await this.offerSector.destroy({ where: { offerId: id } })
                const offerSectors = dataOffer.sectors.map(sector => {
                    return {
                        offerId: id,
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

    async findOffersPublished(status) {
        const query = queryOffersPublished(status, this.user, this.sector, this.offerSector)
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
