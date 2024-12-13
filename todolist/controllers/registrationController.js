const Users = require('../models/users'); 
const bcrypt = require('bcrypt');

const registrationController = async (req, res, next) => {
    const body = req.body;

    if (!body.user_name || !body.email || !body.password) {
        return res.status(400).json({
            success: false,
            message: 'Bad request'
        });
    }

    salt = await bcrypt.genSalt(10);
    pass = await bcrypt.hash(body.password, salt);

    const newUser = await Users.create({
        user_name: body.user_name,
        email: body.email,
        password: pass,
        salt: salt
    })

    if (!newUser) {
        return res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }

    return res.status(201).json({
        success: true,
        message: newUser.toJSON()
    });
}

module.exports = registrationController;