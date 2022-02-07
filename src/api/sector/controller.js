// Helpers
import { responseError, responseGET, responsePOST } from '../../helpers/response'
import { paginate } from '../../helpers/pagination'

// Service Class
import SectorService from './service'

class SectorController extends SectorService {
    constructor(dependenciesData) {
        super(dependenciesData)
        this.error = new Error()
    }

    async create(req, res) {
        try {
            const result = await this.createSector(req.body)
            const response = responsePOST({
                msg: 'Create Successfully.',
                skill: result,
            })
            return res.status(201).json(response)
        } catch (err) {
            const error = responseError([err])
            res.status(500).json(error)
        }
    }

    async findAll(req, res) {
        const page = req.query.page ? req.query.page : 1
        const limit = req.query.limit ? req.query.limit : 8
        try {
            const paginationData = paginate(page, limit)
            const result = await this.findSectors(paginationData)
            const response = responseGET(paginationData.pagination, result)
            return res.status(200).json(response)
        } catch (err) {
            const error = responseError([err])
            res.status(500).json(error)
        }
    }

    async findById(req, res) {
        try {
            const id = req.params.id
            const result = await this.findSectorById(id)
            const response = responseGET(null, result)
            return res.status(200).json(response)
        } catch (err) {
            const error = responseError([err])
            res.status(500).json(error)
        }
    }

    async update(req, res) {
        try {
            const id = req.params.id
            const result = await this.updateSector(id, req.body)
            if (!result) {
                const error = responseError({
                    msg: 'Error updating sector. Try again.',
                })
                return res.status(401).json(error)
            } else {
                const response = responsePOST({
                    msg: 'Updated Successfully.',
                })
                return res.status(200).json(response)
            }
        } catch (err) {
            const error = responseError([err])
            res.status(500).json(error)
        }
    }

    async delete(req, res) {
        try {
            const id = req.params.id
            const result = await this.deleteSector(id)
            const response = responsePOST({
                msg: 'Deleted Successfully.',
            })
            return res.status(200).json(response)
        } catch (err) {
            const error = responseError([err])
            res.status(500).json(error)
        }
    }
}

export default SectorController
