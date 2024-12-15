const authToken = require('../middlewares/authToken')
const router = require('express').Router()

const TodoController = require('../controllers/todoController')

const validateLists = require('../services/validationService').validateLists
const validateTasks = require('../services/validationService').validateTasks

router.use(authToken)

router.get('/', async (req, res) => {
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
})

router.post('/', async (req, res) => {
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

router.put('/', async (req, res) => {
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
})

router.delete('/', async (req, res) => {
    try {
        await TodoController.deleteList(req)
        return res.status(205).send()
    } catch (err) {
        return res.status(400).json({ message: err.message })
    }
})

router.get('/tasks', async (req, res) => {
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
})

router.post('/tasks', async (req, res) => {
    const { error } = validateTasks(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    } else {
        try {
            const task = await TodoController.createTask(req)
            return res.status(201).json({
                success: true,
                task
            })
        } catch (err) {
            return res.status(400).json({ message: err.message })
        }
    }
})

router.put('/tasks', async (req, res) => {
    const { error } = validateTasks(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    } else {
        try {
            await TodoController.updateTask(req)
            return res.status(204).send()
        } catch (err) {
            return res.status(400).json({ message: err.message })
        }
    }
})

router.delete('/tasks', async (req, res) => {
    try {
        await TodoController.deleteTask(req)
        return res.status(205).send()
    } catch (err) {
        return res.status(400).json({ message: err.message })
    }
})

module.exports = router