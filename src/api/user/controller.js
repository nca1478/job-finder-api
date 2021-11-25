// Dependencies
import bcrypt from 'bcryptjs'

// Helpers
import { responseError, responseGET, responsePOST } from '../../helpers/response'
import { sendTokenUser } from '../../helpers/sendToken'

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
                msg: 'Create Successfully.',
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
        try {
            const result = await this.findUsers()
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
                cvText: req.body.cvText,
                skills: req.body.skills,
            }
            const password = req.body.password
            const result = await this.updateUser(dataUser, password)
            if (!result) {
                const error = responseError({
                    msg: 'Password is not correct',
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
            const result = await this.deleteUser(id)
            const response = responsePOST({
                msg: 'Deleted Successfully.',
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
                    msg: 'Login Successfully.',
                    user: result,
                    token: sendTokenUser(result),
                }
                const response = responsePOST(data)
                return res.status(200).json(response)
            } else {
                if (result === null) {
                    const error = responseError({
                        msg: "The email doesn't exist or user is not active",
                    })
                    return res.status(404).json(error)
                } else {
                    const error = responseError({
                        msg: 'The combination of email and password does not exist',
                    })
                    return res.status(401).json(error)
                }
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
                    msg: 'Email sended succesfully.',
                    messageId: result.messageId,
                }
                const response = responsePOST(data)
                return res.status(200).json(response)
            } else {
                const error = responseError({
                    msg: 'Email not found or not allowed to change password',
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
                        msg: 'Password changed succesfully.',
                        messageId: result.messageId,
                    }
                    const response = responsePOST(dataResponse)
                    return res.status(200).json(response)
                } else {
                    const error = responseError({
                        msg: 'Error recover password. Try again.',
                    })
                    return res.status(400).json(error)
                }
            } else {
                const error = responseError({
                    msg: 'Error recovering password. Token is not correct or User not found.',
                })
                return res.status(400).json(error)
            }
        } catch (err) {
            const error = responseError([err])
            return res.status(500).json(error)
        }
    }
}

export default UserController
