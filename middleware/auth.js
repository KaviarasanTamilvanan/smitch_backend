const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
    try{
        const decode = jwt.verify(req.headers.token, process.env.JWT_KEY)
        req.userDetails = decode;
        next()
    } catch {
        return res.status(401).json({
            message : "Username and Password doesn't match!"
        })
    }
}