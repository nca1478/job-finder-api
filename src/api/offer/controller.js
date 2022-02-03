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
            const data = {
                userId: req.user.id,
                dataOffer: req.body,
                sectors: req.body.sectors,
                skills: req.body.skills,
            }
            const result = await this.createOffer(data)
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
            const userId = req.user.id
            const result = await this.findOffers(userId)
            const response = responseGET(null, result)
            return res.status(200).json(response)
        } catch (err) {
            const error = responseError([err])
            res.status(500).json(error)
        }
    }

    async findById(req, res) {
        try {
            const offerId = req.params.id
            const result = await this.findOfferById(offerId)
            const response = responseGET(null, result)
            return res.status(200).json(response)
        } catch (err) {
            const error = responseError([err])
            res.status(500).json(error)
        }
    }

    async lastOffers(req, res) {
        try {
            const limit = parseInt(req.query.limit)
            const result = await this.getLastOffers(limit)
            const response = responseGET(null, result)
            return res.status(200).json(response)
        } catch (err) {
            const error = responseError([err])
            res.status(500).json(error)
        }
    }

    async search(req, res) {
        try {
            const search = req.query.q
            const result = await this.searchOffers(search)
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

    async upload(req, res) {
        try {
            const dataUpload = {
                id: req.params.id,
                img: req.files.img,
                validExtensions: ['jpg', 'jpeg', 'png'],
            }
            const result = await this.uploadImage(dataUpload)
            if (result !== false) {
                const response = responsePOST({
                    msg: 'Upload Successfully.',
                    url: result,
                })
                return res.status(200).json(response)
            } else {
                const error = responseError({
                    msg: `Only ${dataUpload.validExtensions} file extensions are accepted.`,
                })
                return res.status(400).json(error)
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

    async delete(req, res) {
        try {
            const id = req.params.id
            const result = await this.deleteOffer(id)
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

export default OfferController
