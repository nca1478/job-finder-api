export default {
    secret: process.env.SESSION_SECRET,
    expirationUser: { expiresIn: 60 * 60 * 24 * 1 }, // 1 days
    expirationRecoverPass: { expiresIn: 60 * 60 * 24 * 1 }, // 1 days
}
