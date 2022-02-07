// Queries
import { querySectorsList, querySectorById } from './querys'

class SectorService {
    constructor(dependenciesData) {
        this.error = new Error()

        if (!dependenciesData.sector) {
            this.error.dependencyError = 'Sector Model is undefined'
            throw this.error.dependencyError
        } else {
            this.sector = dependenciesData.sector
        }
    }

    async createSector(data) {
        try {
            const result = await this.sector.create(data)
            return result
        } catch (err) {
            throw err
        }
    }

    async findSectors(paginationData) {
        const query = querySectorsList(paginationData)
        return await this.sector.findAndCountAll(query)
    }

    async findSectorById(id) {
        const query = querySectorById(id)
        return this.sector.findOne(query)
    }

    async updateSector(id, dataSector) {
        try {
            const sectorResponse = await this.sector.update({ ...dataSector }, { where: { id } })
            return sectorResponse
        } catch (err) {
            throw err
        }
    }

    async deleteSector(id) {
        try {
            let result = await this.sector.update({ active: false }, { where: { id } })
            return result
        } catch (err) {
            throw err
        }
    }
}

export default SectorService
