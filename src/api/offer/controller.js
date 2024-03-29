// Helpers
import { responseError, responseGET, responsePOST } from '../../helpers/response'
import { paginate } from '../../helpers/pagination'

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
                msg: 'Oferta creada exitosamente.',
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
        const limit = req.query.limit ? req.query.limit : 4

        try {
            const userId = req.user.id
            const paginationData = paginate(page, limit)
            const result = await this.findOffers(userId, paginationData)
            const response = responseGET(paginationData.pagination, result)
            return res.status(200).json(response)
        } catch (err) {
            const error = responseError([err])
            res.status(500).json(error)
        }
    }

    async findAllbyPub(req, res) {
        const page = req.query.page ? req.query.page : 1
        const limit = req.query.limit ? req.query.limit : 8

        try {
            const status = req.query.status === 'true' ? true : false
            const paginationData = paginate(page, limit)
            const result = await this.findOffersPublished(status, paginationData)
            const response = responseGET(paginationData.pagination, result)
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
                    msg: 'Error actualizando oferta de trabajo. Intente nuevamente.',
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
                    msg: 'Subida de archivo exitosa.',
                    url: result,
                })
                return res.status(200).json(response)
            } else {
                const error = responseError({
                    msg: `Solo las extensiones ${dataUpload.validExtensions} son aceptadas.`,
                })
                return res.status(400).json(error)
            }
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
                    msg: 'Error publicando oferta de trabajo. Intente nuevamente.',
                })
                return res.status(401).json(error)
            } else {
                const response = responsePOST({
                    msg: `${status ? 'Publicación' : 'Despublicación'} Exitosa.`,
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
                msg: 'Registro borrado exitosamente.',
            })
            return res.status(200).json(response)
        } catch (err) {
            const error = responseError([err])
            res.status(500).json(error)
        }
    }
}

export default OfferController
