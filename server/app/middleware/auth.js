const jwt = require('jsonwebtoken');
const config = require('../config');
const verifyToken = (req, res, next) => {
    // authorization Baser ádfkajsdlfjaskldfja
    const authToken = req.headers;
    const token = authToken.authorization.split(' ')[1];
    if(!token)
        return res
        .status(400)
        .json({succsses : false, message : "Access token not found"});
    
    try {
        const decodedToken = jwt.verify(token, config.ACCESS_TOKEN_SECRET);
        req.userId = decodedToken.userId;
        next();
    } catch (error) {
        console.log(error);
        res.status(403).json({succsses : false, message : "Invalid token"});
    }
}

module.exports = verifyToken;