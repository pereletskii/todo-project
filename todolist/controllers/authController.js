const Users = require('../models/users'); 
const bcrypt = require('bcrypt');
const generateAccessToken = require('../services/jwtService');

const authController = async (req, res, next) => {
    const body = req.body;

    if (!body.email || !body.password) {
        return res.status(400).json({
            success: false,
            message: 'Bad request'
        });
    }

    let user = await Users.findOne({ where:{ email: body.email } })

    await bcrypt.compare(body.password, user.password).then(function(result) {
        if (!result) {
            return res.status(400).json({
                success: false,
                message: 'Wrong password'
            });
        } else {
            let token = generateAccessToken({
                id: user.id,
                user_name: user.user_name,
                email: user.email
            });
            // TODO: add cookie encode
            return res.status(202)
                .header('auth-token', token) // TODO: change to cookie
                .json({
                    success: true,
                    message: {
                        id: user.id,
                        user_name: user.user_name,
                        email: user.email
                    }
                });
        }
    });    
}

module.exports = authController;