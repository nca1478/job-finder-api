// Helpers
import { responseError, responseGET, responsePOST } from '../../helpers/response'

// Service
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
        try {
            const result = await this.findSkills()
            const response = responseGET(null, result)
            return res.status(200).json(response)
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
                msg: 'Deleted Successfully.',
            })
            return res.status(200).json(response)
        } catch (err) {
            const error = responseError([err])
            res.status(500).json(error)
        }
    }
}

export default SkillController
