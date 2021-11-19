// Dependencies
import jwt from 'jsonwebtoken'

// Config
import jwtConfig from '../config/jwt'

const sendTokenUser = user => {
    const payload = {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        img: user.img,
        google: user.google,
        facebook: user.facebook,
        createdAt: user.createdAt,
    }

    return jwt.sign(payload, jwtConfig.secret, jwtConfig.expirationUser)
}

export { sendTokenUser }
