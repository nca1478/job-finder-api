// Helpers
import { responseError, responseGET, responsePOST } from '../../helpers/response'
import { paginate } from '../../helpers/pagination'

// Service Class
import SkillService from './service'

class SkillController extends SkillService {
    constructor(dependenciesData) {
        super(dependenciesData)
        this.error = new Error()
    }

    async create(req, res) {
        try {
            const result = await this.createSkill(req.body)
            const response = responsePOST({
                msg: 'Registro creado exitosamente.',
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
            const result = await this.findSkills(paginationData)
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
            const result = await this.findSkillById(id)
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
            const result = await this.updateSkill(id, req.body)
            if (!result) {
                const error = responseError({
                    msg: 'Error actualizando habilidad. Intente nuevamente.',
                })
                return res.status(401).json(error)
            } else {
                const response = responsePOST({
                    msg: 'Registro actualizado exitosamente.',
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
            const result = await this.deleteSkill(id)
            const response = responsePOST({
                msg: 'Registro borrado exitosamente.',
            })
            return res.status(200).json(response)
        } catch (err) {
            const error = responseError([err])
            res.status(500).json(error)
        }
    }
}

export default SkillController
