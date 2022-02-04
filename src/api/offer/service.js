// Dependencies
const path = require('path')
const cloudinary = require('cloudinary').v2
cloudinary.config(process.env.CLOUDINARY_URL)

// Queries
import {
    queryOffersList,
    queryOfferById,
    queryOffersPublished,
    querySearchOffers,
    queryLastOffers,
} from './querys'

// Helpers
import { verifyFiles } from '../../helpers/verifyFiles'

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

        if (!dependenciesData.skill) {
            this.error.dependencyError = 'Skill Model is undefined'
            throw this.error.dependencyError
        } else {
            this.skill = dependenciesData.skill
        }

        if (!dependenciesData.offerSkill) {
            this.error.dependencyError = 'OfferSkill Model is undefined'
            throw this.error.dependencyError
        } else {
            this.offerSkill = dependenciesData.offerSkill
        }
    }

    async createOfferSectors(sectors, offerId) {
        const offerSectors = sectors.map(sector => {
            return {
                offerId,
                sectorId: sector.id,
            }
        })
        await this.offerSector.bulkCreate(offerSectors)
    }

    async createOfferSkills(skills, offerId) {
        const offerSkills = skills.map(skill => {
            return {
                offerId,
                skillId: skill.id,
            }
        })
        await this.offerSkill.bulkCreate(offerSkills)
    }

    async createOffer({ userId, dataOffer, sectors, skills }) {
        const data = { ...dataOffer, userId }
        try {
            const offerResponse = await this.offer.create(data)
            if (offerResponse) {
                this.createOfferSectors(sectors, offerResponse.id)
                this.createOfferSkills(skills, offerResponse.id)

                return offerResponse
            } else {
                return offerResponse
            }
        } catch (err) {
            throw err
        }
    }

    async findOffers(userId) {
        const query = queryOffersList(
            userId,
            this.user,
            this.sector,
            this.offerSector,
            this.skill,
            this.offerSkill,
        )
        return await this.offer.findAll(query)
    }

    async findOfferById(offerId) {
        const query = queryOfferById(
            offerId,
            this.user,
            this.sector,
            this.offerSector,
            this.skill,
            this.offerSkill,
        )
        return this.offer.findOne(query)
    }

    async getLastOffers(limit = 4) {
        const query = queryLastOffers(
            limit,
            this.user,
            this.sector,
            this.offerSector,
            this.skill,
            this.offerSkill,
        )
        return await this.offer.findAll(query)
    }

    async searchOffers(search) {
        const query = querySearchOffers(
            search,
            this.user,
            this.sector,
            this.offerSector,
            this.skill,
            this.offerSkill,
        )
        return await this.offer.findAll(query)
    }

    async updateOffer(id, dataOffer) {
        try {
            let offerResponse = await this.offer.update({ ...dataOffer }, { where: { id } })
            if (offerResponse) {
                await this.offerSector.destroy({ where: { offerId: id } })
                this.createOfferSectors(dataOffer.sectors, id)

                await this.offerSkill.destroy({ where: { offerId: id } })
                this.createOfferSkills(dataOffer.skills, id)

                return offerResponse
            } else {
                return offerResponse
            }
        } catch (err) {
            throw err
        }
    }

    async uploadImage(dataUpload) {
        const { id, img, validExtensions } = dataUpload
        const verifyFile = verifyFiles(img, validExtensions)
        if (verifyFile) {
            try {
                const offer = await this.offer.findOne({ where: { id, active: true } })
                if (offer.dataValues.img) {
                    const nameArray = offer.dataValues.img.split('/')
                    const name = nameArray[nameArray.length - 1]
                    const [public_id] = name.split('.')
                    cloudinary.uploader.destroy(public_id)
                }
                const { tempFilePath } = img
                const { secure_url } = await cloudinary.uploader.upload(tempFilePath)
                return secure_url
            } catch (err) {
                throw err
            }
        } else {
            return false
        }
    }

    async findOffersPublished(status, paginationData) {
        const { limit, skip } = paginationData
        const offset = skip
        const query = queryOffersPublished(
            status,
            this.user,
            this.sector,
            this.offerSector,
            this.skill,
            this.offerSkill,
            limit,
            offset,
        )
        return await this.offer.findAndCountAll(query)
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
