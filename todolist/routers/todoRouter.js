const Lists = require('../models/lists')
const Tasks = require('../models/tasks')
const authToken = require('../middlewares/authToken')

const router = require('express').Router()
/*
* Controllers 
*/
/*
* Validators
*/

router.use(authToken)

router.get('/', async (req, res) => {
    res.status(200).json(req.user_info);
    // TODO: Add list JSON response for user
})

module.exports = router