const Users = require('../models/users'); 

const registrationController = (req, res, next) => {
    const body = req.body;

    if (!body.user_name || !body.email || !body.password) {
        return res.status(400).json({
            success: false,
            message: 'Bad request'
        });
    }

    const newUser = Users.create({
        user_name: body.user_name,
        email: body.email,
        password: body.password
    })

    if (!newUser) {
        return res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }

    return res.status(201).json({
        success: true,
        message: newUser
    });
}

module.exports = registrationController;