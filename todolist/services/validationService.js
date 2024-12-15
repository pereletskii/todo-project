const Joi = require('joi');

module.exports.validateRegister = (user) => {
    const schema = Joi.object({
        user_name: Joi.string().min(3).max(100).required(),
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().min(8).max(100).required()
    })
    return schema.validate(user)
}
module.exports.validateLogin = (user) => {
    const schema = Joi.object({
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().min(8).max(100).required()
    })
    return schema.validate(user)
}

module.exports.validateLists = (list) => {
    const schema = Joi.object({
        name: Joi.string().min(1).max(100).required(),
    })
    return schema.validate(list)
}