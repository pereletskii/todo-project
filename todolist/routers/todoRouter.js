const Lists = require('../models/lists')
const Tasks = require('../models/tasks')
const authToken = require('../middlewares/authToken')
const router = require('express').Router()

const TodoController = require('../controllers/todoController')

const validateLists = require('../services/validationService').validateLists

router.use(authToken)

router.get('/', async (req, res) => {
    if (req.query.list_id) {
        let tasks = await TodoController.getTasks(req)
        if (tasks.length == 0) {
            return res.status(200).json({
                success: true,
                message: 'No tasks found'
            })
        } else {
            return res.status(200).json({
                success: true,
                tasks
            })
        }
    } else {
        let lists = await TodoController.getLists(req)
    
        if (lists.length == 0) {
            return res.status(200).json({
                success: true,
                message: 'No lists found'
            })
        } else {
            return res.status(200).json({
                success: true,
                lists
            })
        }
    }
})

router.put('/', async (req, res) => {
    if (req.query.list_id) {
        return res.status(404).send()
    } else {
        const { error } = validateLists(req.body);
        if (error) {
            return res.status(400).send(error.details[0].message);
        } else {
            try {
                await TodoController.updateList(req)
                return res.status(204).send()
            } catch (err) {
                return res.status(400).json({ message: err.message })
            }
        }
    }
})

router.delete('/', async (req, res) => {
    if (req.query.task_id) {
        res.status(204).send()
    } else {
        try {
            await TodoController.deleteList(req)
            return res.status(205).send()
        } catch (err) {
            return res.status(400).json({ message: err.message })
        }
    }

})

router.post('/create-list', async (req, res) => {
    const { error } = validateLists(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    } else {
        try {
            const list = await TodoController.createList(req)
            return res.status(201).json({
                success: true,
                list: list
            })
        } catch (err) {
            return res.status(400).json({ message: err.message })
        }
    }
})

module.exports = router