// Queries
import { querySectorsList } from './querys'

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

    async findSectors() {
        const query = querySectorsList()
        return await this.sector.findAll(query)
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
