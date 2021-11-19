import jwt from 'jsonwebtoken'
import tokenConfig from '../config/jwt'
import { responseError } from './response'

let verifyToken = (req, res, next) => {
    if (req.headers['authorization']) {
        let token = req.headers['authorization'].split('jwt ')[1]
        jwt.verify(token, tokenConfig.secret, (err, decoded) => {
            if (err) {
                const error = { msg: err }
                res.status(403).json(responseError([error]))
            } else {
                req.user = decoded
                next()
            }
        })
    } else {
        const errorInvalid = {
            msg: 'Token is not present. Try again',
        }
        res.status(401).json(responseError([errorInvalid]))
    }
}

let accountToken = (req, res, next) => {
    jwt.verify(req.params.token, tokenConfig.secret, (err, decoded) => {
        if (err) {
            if (err.message === 'jwt expired') {
                const errorExpired = {
                    msg: 'Recovery password token has expired, try again.',
                }
                res.status(401).json(responseError([errorExpired]))
            } else {
                const errorToken = {
                    msg: err.message,
                }
                res.status(401).json(responseError([errorToken]))
            }
        } else {
            if (req.url.indexOf('recovery') >= 0) {
                if (!decoded.isRecovery) {
                    const errorInvalid = {
                        msg: 'Invalid Token',
                    }
                    return res.status(401).json(responseError([errorInvalid]))
                }
            }
            req.body = Object.assign(decoded, req.body)
            next()
        }
    })
}

export { verifyToken, accountToken }
