import jwt from 'jsonwebtoken'

export default (req, res, next) => {
    const token = (req.headers.authorization || '').replace(/Bearer\s?/, '')
    if (token) {
        try {
            const decoded = jwt.verify(token, 'secret')
            req.userId = decoded._id
            next()
        } catch (e) {
            res.status(403).json({
                message: 'no access'
            })
        }
    } else {
        res.status(404).json({
            message: 'no access'
        })
    }
}