const Lists = require('../models/lists')
const Tasks = require('../models/tasks')

function nullForNothing(params) {
    if (!params) {
        return null
    }
    return params
}

module.exports = class TodoController {
    static async getLists(req) {
        if (req.query.list_name) {
            let list = await Lists.findAll({ where: { name: req.query.list_name } })
            if (!list) {
                return []
            }
            return list
        } else {
            let lists = await Lists.findAll({ where: { owner_id: req.user_info.id } })
            return lists
        }
    }

    static async createList(req) {
        let list = await Lists.create({
            name: req.body.name,
            owner_id: req.user_info.id
        })
        return list
    }

    static async updateList(req) {
        let list = await Lists.update({
            name: req.body.name
        }, {
            where: {
                id: req.query.list_id
            }
        })
        return list
    }

    static async deleteList(req) {
        let list = await Lists.destroy({
            where: {
                id: req.query.list_id
            }
        })
        return list
    }

    static async getTasks(req) {
        let tasks = await Tasks.findAll({ where: { list_id: req.query.list_id } })
        return tasks
    }

    static async createTask(req) {
        let task = await Tasks.create({
            name: req.body.name,
            description: nullForNothing(req.body.description),
            images: nullForNothing(req.body.images),
            list_id: req.query.list_id
        })
        return task
    }

    static async updateTask(req) {
        let task = await Tasks.update({
            name: req.body.name,
            description: nullForNothing(req.body.description),
            images: nullForNothing(req.body.images),
            list_id: req.query.list_id
        }, {
            where: {
                id: req.query.task_id
            }
        })
        return task
    }

    static async deleteTask(req) {
        let task = await Tasks.destroy({
            where: {
                id: req.query.task_id
            }
        })
        return task
    }
}