const Users = require('../models/users')

const router = require('express').Router()

const registrationController = require('../controllers/registrationController')
const authController = require('../controllers/authController')

const checkToken = require('../middlewares/authToken').checkToken

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
    console.log(req.headers['auth-token'])
    const token = req.headers['auth-token']; // TODO: change to cookie
    if (token && checkToken(token)) {
        return res.status(400).send('User already logged in')
    }
   
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