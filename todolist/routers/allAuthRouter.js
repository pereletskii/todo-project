const Users = require('../models/users')

const router = require('express').Router()

const registrationController = require('../controllers/registrationController')
const authController = require('../controllers/authController')
const userController = require('../controllers/userController')

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
    console.log(req.cookies.authToken)
    const token = req.cookies.authToken;
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

router.put('/', async (req, res) => {
    const token = req.cookies.authToken;
    console.log('current_token: ', token)

    if (token == null) {
        return res.status(401).json({
            success: false,
            message: 'Unauthorized'
        });
    } else {
        const user_info = checkToken(token);
        console.log('user_info: ', user_info)
        if (!user_info) {
            return res.status(403).json({
                success: false,
                message: 'Forbidden'
            });
        } else {
            req.user_info = user_info;
        }
    }

    const { error } = validateRegister(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }

    try {
        await userController(req, res);
    } catch (err) {
        console.log(err);
        return res.status(400).json({ message: err.message });
    }
})

router.delete('/', async (req, res) => {
    res.clearCookie('authToken');
    return res.status(205).send();
})

module.exports = router