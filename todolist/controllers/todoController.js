const Lists = require('../models/lists')
const Tasks = require('../models/tasks')

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
}