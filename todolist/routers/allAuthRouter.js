const Users = require('../models/users')
const router = require('express').Router()
const registrationController = require('../controllers/registrationController')
const authController = require('../controllers/authController')
const validateRegister = require('../services/validationService').validateRegister
const validateLogin = require('../services/validationService').validateLogin

router.post('/registration', async (req, res) => {
    console.log(req.body)
    const { error } = validateRegister(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }

    let user = await Users.findOne({ where:{ email: req.body.email } })
    if (user) {
        return res.status(400).send('User already exisits. Please sign in')
    } else {
        try {
            await registrationController(req, res);
        } catch (err) {
            return res.status(400).json({ message: err.message })
        }
    }
})

router.post('/login', async (req, res) => {
    console.log(req.body)
    const { error } = validateLogin(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }

    let user = await Users.findOne({ where:{ email: req.body.email } })
    if(!user) {
        return res.status(400).send('User not found')
    } else {
        try {
            await authController(req, res);
        } catch (err) {
            return res.status(400).json({ message: err.message })
        }
    }
})

module.exports = router