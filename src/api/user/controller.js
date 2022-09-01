// Dependencies
import bcrypt from 'bcryptjs'

// Helpers
import { responseError, responseGET, responsePOST } from '../../helpers/response'
import { sendTokenUser } from '../../helpers/sendToken'
import { paginate } from '../../helpers/pagination'

// Service Class
import UserService from './service'

class UserController extends UserService {
    constructor(dependenciesData) {
        super(dependenciesData)
        this.error = new Error()
    }

    async create(req, res) {
        try {
            const dataUser = {
                name: req.body.name,
                email: req.body.email,
                password: bcrypt.hashSync(req.body.password),
                role: req.body.role,
            }
            const result = await this.createUser(dataUser)
            const response = responsePOST({
                msg: 'Registro creado exitosamente.',
                user: result,
                token: sendTokenUser(result),
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
            const paginationData = paginate(page, limit)
            const result = await this.findUsers(paginationData)
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
            const result = await this.findUserById(id)
            const response = responseGET(null, result)
            return res.status(200).json(response)
        } catch (err) {
            const error = responseError([err])
            res.status(500).json(error)
        }
    }

    async update(req, res) {
        try {
            const dataUser = {
                id: req.params.id,
                name: req.body.name,
                email: req.body.email,
                profession: req.body.profession,
                birthday: req.body.birthday,
                education: req.body.education,
                cvUrl: req.body.cvUrl,
                linkedinUser: req.body.linkedinUser,
                twitterUser: req.body.twitterUser,
                instagramUser: req.body.instagramUser,
                facebookUser: req.body.facebookUser,
            }
            const result = await this.updateUser(dataUser)
            const response = responsePOST({
                msg: 'Registro actualizado exitosamente.',
            })
            return res.status(200).json(response)
        } catch (err) {
            const error = responseError([err])
            res.status(500).json(error)
        }
    }

    async delete(req, res) {
        try {
            const id = req.params.id
            const result = await this.deleteUser(id)
            const response = responsePOST({
                msg: 'Registro borrado exitosamente.',
            })
            return res.status(200).json(response)
        } catch (err) {
            const error = responseError([err])
            res.status(500).json(error)
        }
    }

    async login(req, res) {
        try {
            const dataLogin = {
                email: req.body.email,
                password: req.body.password,
            }
            let result = await this.loginUser(dataLogin)
            if (result) {
                const data = {
                    msg: 'Login Exitoso.',
                    user: result,
                    token: sendTokenUser(result),
                }
                const response = responsePOST(data)
                return res.status(200).json(response)
            } else {
                if (result === null) {
                    const error = responseError({
                        msg: 'El email no existe o el usuario no está activo',
                    })
                    return res.status(404).json(error)
                } else {
                    const error = responseError({
                        msg: 'La combinación de email y contraseña no existe',
                    })
                    return res.status(401).json(error)
                }
            }
        } catch (err) {
            const error = responseError([err])
            res.status(500).json(error)
        }
    }

    async google(req, res) {
        try {
            const tokenId = req.body.tokenId
            let result = await this.loginGoogle(tokenId)
            if (result) {
                const data = {
                    msg: 'Login de Google exitoso.',
                    user: result,
                    token: sendTokenUser(result),
                }
                const response = responsePOST(data)
                return res.status(200).json(response)
            } else {
                const error = responseError({
                    msg: 'El usuario no está activo.',
                })
                return res.status(404).json(error)
            }
        } catch (err) {
            const error = responseError([err])
            res.status(500).json(error)
        }
    }

    async facebook(req, res) {
        try {
            const facebookData = req.body
            let result = await this.loginFacebook(facebookData)
            if (result) {
                const data = {
                    msg: 'Login de facebook exitoso.',
                    user: result,
                    token: sendTokenUser(result),
                }
                const response = responsePOST(data)
                return res.status(200).json(response)
            } else {
                const error = responseError({
                    msg: 'El usuario no está activo.',
                })
                return res.status(404).json(error)
            }
        } catch (err) {
            const error = responseError([err])
            return res.status(500).json(error)
        }
    }

    async verify(req, res) {
        try {
            const dataUser = {
                email: req.body.email,
                password: req.body.password,
            }
            let result = await this.verifyUser(dataUser)
            if (result) {
                const response = responsePOST({
                    user: result,
                })
                return res.status(200).json(response)
            } else {
                const error = responseError({
                    msg: 'La combinación de email y contraseña no existe.',
                })
                return res.status(401).json(error)
            }
        } catch (err) {
            const error = responseError([err])
            res.status(500).json(error)
        }
    }

    async sendEmailRecovery(req, res) {
        try {
            let email = req.body.email
            let result = await this.sendEmailRecoveryPass(email)
            if (result) {
                const data = {
                    msg: 'Email enviado exitosamente.',
                    messageId: result.messageId,
                }
                const response = responsePOST(data)
                return res.status(200).json(response)
            } else {
                const error = responseError({
                    msg: 'Email no encontrado o no permite cambiar contraseña.',
                })
                return res.status(401).json(error)
            }
        } catch (err) {
            const error = responseError([err])
            return res.status(500).json(error)
        }
    }

    async recoveryPass(req, res) {
        try {
            const data = {
                email: req.body.email,
                password: req.body.newPassword,
                token: req.params.token,
            }
            let result = await this.recoveryPassword(data)
            if (result) {
                if (result.accepted[0].length > 0) {
                    const dataResponse = {
                        msg: 'Contraseña cambiada exitosamente.',
                        messageId: result.messageId,
                    }
                    const response = responsePOST(dataResponse)
                    return res.status(200).json(response)
                } else {
                    const error = responseError({
                        msg: 'Error al recuperar contraseña. Intente nuevamente.',
                    })
                    return res.status(400).json(error)
                }
            } else {
                const error = responseError({
                    msg: 'Error al recuperar la contraseña. El token no es correcto o no se encuentra el usuario.',
                })
                return res.status(400).json(error)
            }
        } catch (err) {
            const error = responseError([err])
            return res.status(500).json(error)
        }
    }

    async uploadPDF(req, res) {
        try {
            const dataUpload = {
                id: req.params.id,
                pdf: req.files.pdf,
                validExtensions: ['pdf'],
            }
            const result = await this.uploadUserPDF(dataUpload)
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
}

export default UserController
