import jwt from "jsonwebtoken"

const pass = '53cr3t_P455w0rd'

export const verifyAccessToken = (req, res, next) => {
    const authHeader = req.headers.authorization
    if (authHeader) {
        const token = authHeader.split(" ").pop()
        jwt.verify(token, pass, (err, decoded) => {
            if (err) return res.status(401).json({success: false, message: 'invalid or expired access token'})
            req.decoded = decoded //token
            next()
        })
    }else {
        res.status(401).json({success: false, message: 'no access token provided'})
    }
}