// Dependencies
import axios from 'axios'
import bcrypt from 'bcryptjs'
const cloudinary = require('cloudinary').v2
cloudinary.config(process.env.CLOUDINARY_URL)

// Queries
import {
    queryUsersList,
    queryUserById,
    querySendEmailRecovery,
    queryRecoveryPassword,
} from './querys'

// Helpers
import { recoveryToken } from '../../helpers/sendToken'
import { forgotPass, passChanged } from '../../helpers/mail'
import { googleVerify } from '../../helpers/googleVerify'

class UserService {
    constructor(dependenciesData) {
        this.error = new Error()

        if (!dependenciesData.user) {
            this.error.dependencyError = 'User Model is undefined'
            throw this.error.dependencyError
        } else {
            this.user = dependenciesData.user
        }

        if (!dependenciesData.skill) {
            this.error.dependencyError = 'Skill Model is undefined'
            throw this.error.dependencyError
        } else {
            this.skill = dependenciesData.skill
        }
    }

    async createUser(dataUser) {
        try {
            const result = await this.user.create(dataUser)
            return result
        } catch (err) {
            throw err
        }
    }

    async findUsers() {
        const query = queryUsersList()
        return await this.user.findAll(query)
    }

    async findUserById(id) {
        const query = queryUserById(id)
        return this.user.findOne(query)
    }

    async updateUser(dataUser, password) {
        const { id, email } = dataUser
        let compare = ''
        try {
            const user = await this.user.findOne({ where: { id, email } })
            if (password) {
                compare = bcrypt.compareSync(password, user.password)
                if (!compare) {
                    return compare
                }
            }
            const userResponse = await this.user.update({ ...dataUser }, { where: { id } })
            return userResponse
        } catch (err) {
            throw err
        }
    }

    async deleteUser(id) {
        try {
            let result = await this.user.update({ active: false }, { where: { id } })
            return result
        } catch (err) {
            throw err
        }
    }

    setUserInfo = user => {
        return {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
            img: user.img,
            google: user.google,
            facebook: user.facebook,
            cvUrl: user.cvUrl ? user.cvUrl : null,
            createdAt: user.createdAt,
        }
    }

    async loginUser(dataLogin) {
        const { email, password } = dataLogin

        try {
            const user = await this.user.findOne({ where: { email, active: true } })
            if (user) {
                let compare = bcrypt.compareSync(password, user.password)
                const userInfo = this.setUserInfo(user)
                if (compare) {
                    return userInfo
                } else {
                    return compare
                }
            } else {
                return user
            }
        } catch (err) {
            throw err
        }
    }

    async loginGoogle(tokenId) {
        try {
            const { email, name, img } = await googleVerify(tokenId)
            const user = await this.user.findOne({ where: { email } })
            if (!user) {
                const userInfo = {
                    name,
                    email,
                    password: ':P',
                    img,
                    google: true,
                    facebook: false,
                }
                const result = await this.user.create(userInfo)
                return result
            } else {
                if (user.active) {
                    const userInfo = this.setUserInfo(user)
                    return userInfo
                } else {
                    return null
                }
            }
        } catch (err) {
            throw err
        }
    }

    async loginFacebook({ userID, accessToken }) {
        try {
            const urlGraphFacebook = `https://graph.facebook.com/${userID}?fields=id,name,email,picture&access_token=${accessToken}`
            const response = await axios.get(urlGraphFacebook)
            const facebookData = {
                email: response.data.email,
                name: response.data.name,
                img: response.data.picture.data.url,
            }

            const user = await this.user.findOne({ where: { email: facebookData.email } })
            if (!user) {
                const userInfo = {
                    name: facebookData.name,
                    email: facebookData.email,
                    password: ':P',
                    img: facebookData.img,
                    google: false,
                    facebook: true,
                }
                const result = await this.user.create(userInfo)
                return result
            } else {
                if (user.active) {
                    const userInfo = this.setUserInfo(user)
                    return userInfo
                } else {
                    return null
                }
            }
        } catch (err) {
            throw err
        }
    }

    async sendEmailRecoveryPass(email) {
        const query = querySendEmailRecovery(email)
        try {
            const user = await this.user.findOne(query)
            if (user) {
                const tokenRecovery = recoveryToken(email)
                let result = await this.user.update(
                    { tokenRecovery },
                    { where: { email, active: true } },
                )
                const responseEmail = await forgotPass(email, tokenRecovery)
                return responseEmail
            } else {
                return user
            }
        } catch (err) {
            throw err
        }
    }

    async recoveryPassword({ email, password, token }) {
        const query = queryRecoveryPassword(email, token)
        try {
            let user = await this.user.findOne(query)
            if (user) {
                let newPassword = bcrypt.hashSync(password)
                let userResponse = await this.user.update(
                    { password: newPassword, tokenRecovery: null },
                    { where: { email, active: true } },
                )
                if (userResponse) {
                    const responseEmail = await passChanged(email)
                    return responseEmail
                }
            } else {
                return user
            }
        } catch (err) {
            throw err
        }
    }

    async uploadUserPDF(dataUpload) {
        const { id, pdf } = dataUpload
        try {
            const user = await this.user.findOne({ where: { id, active: true } })
            if (user.dataValues.cvUrl) {
                const nameArray = user.dataValues.cvUrl.split('/')
                const name = nameArray[nameArray.length - 1]
                const [public_id] = name.split('.')
                cloudinary.uploader.destroy(public_id)
            }
            const { tempFilePath } = pdf
            const { secure_url } = await cloudinary.uploader.upload(tempFilePath)
            return secure_url
        } catch (err) {
            throw err
        }
    }
}

export default UserService
