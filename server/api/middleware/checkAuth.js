const jwt = require('jsonwebtoken');

const getTS = function() {
    return Math.floor(Date.now() / 1000)
}

module.exports = function(req, res, next) {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (decoded.exp < getTS()) {
            throw Error;
        }
        req.tokenData = decoded;
        next();
    }
    catch (error) {
        return res.status(401).json({
            message: 'Unauthorized'
        })
    }
}