// Dependencies
import bcrypt from 'bcryptjs'

// Queries
import { queryUsersList, queryUserById } from './querys'

class UserService {
    constructor(dependenciesData) {
        this.error = new Error()

        if (!dependenciesData.user) {
            this.error.dependencyError = 'User Model is undefined'
            throw this.error.dependencyError
        } else {
            this.user = dependenciesData.user
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
        try {
            const user = await this.user.findOne({
                where: { id: dataUser.id, email: dataUser.email },
            })
            let compare = bcrypt.compareSync(password, user.password)
            if (compare) {
                let result = await this.user.update({ dataUser }, { where: { id: dataUser.id } })
                return result
            } else {
                return compare
            }
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
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            img: user.img,
            google: user.google,
            facebook: user.facebook,
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
}

export default UserService
