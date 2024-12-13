const jwt = require('jsonwebtoken')
const access_token = require('../env_config.json').jwt_access_token

const generateAccessToken = (user_info) => {
    return jwt.sign(user_info, access_token);
}

module.exports = generateAccessToken