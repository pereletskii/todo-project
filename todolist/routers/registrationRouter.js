const Users = require('../models/users')
const validate = require('../models/users').validate
const router = require('express').Router()
const registrationController = require('../controllers/registrationController')

router.post('/', async (req, res) => {
    console.log(req.body)
    const { error } = validate(req.body);
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

module.exports = router