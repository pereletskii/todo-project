const jwt = require('jsonwebtoken');
const access_token = require('../env_config.json').jwt_access_token

const checkToken = (token) => {
     // TODO: add coockie decode
    return jwt.verify(token, access_token, (err, user_info) => {
        if (err) {
            return false
        }
        return user_info
    });
}

const authToken = (req, res, next) => {
    const token = req.headers['auth-token']; // TODO: change to cookie
    console.log('current_token: ', token)

    if (token == null) {
        return res.status(401).json({
            success: false,
            message: 'Unauthorized'
        });
    } else {
        const user_info = checkToken(token);
        if (!user_info) {
            return res.status(403).json({
                success: false,
                message: 'Forbidden'
            });
        } else {
            req.user_info = user_info;
        }
    }
    
    next();
}

module.exports = authToken
module.exports.checkToken = checkToken