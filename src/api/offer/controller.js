// Helpers
import { responseError, responseGET, responsePOST } from '../../helpers/response'

// Service
import OfferService from './service'

class OfferController extends OfferService {
    constructor(dependenciesData) {
        super(dependenciesData)
        this.error = new Error()
    }

    async create(req, res) {
        try {
            const result = await this.createOffer(req.body)
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
            const result = await this.findOffers()
            const response = responseGET(null, result)
            return res.status(200).json(response)
        } catch (err) {
            const error = responseError([err])
            res.status(500).json(error)
        }
    }

    async findById(req, res) {
        try {
            const id = req.params.id
            const result = await this.findOfferById(id)
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
            const result = await this.updateOffer(id, req.body)
            if (!result) {
                const error = responseError({
                    msg: 'Error updating job offer. Try again.',
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

    async findAllbyPub(req, res) {
        try {
            const status = req.query.status === 'true' ? true : false
            const result = await this.findOffersPublished(status)
            const response = responseGET(null, result)
            return res.status(200).json(response)
        } catch (err) {
            const error = responseError([err])
            res.status(500).json(error)
        }
    }

    async publish(req, res) {
        try {
            const id = req.params.id
            const status = req.query.status === 'true' ? true : false
            const result = await this.publishOffer(id, status)
            if (!result) {
                const error = responseError({
                    msg: 'Error publishing job offer. Try again.',
                })
                return res.status(401).json(error)
            } else {
                const response = responsePOST({
                    msg: `${status ? 'Publish' : 'Unpublish'} Successfully.`,
                })
                return res.status(200).json(response)
            }
        } catch (err) {
            const error = responseError([err])
            res.status(500).json(error)
        }
    }
}

export default OfferController
