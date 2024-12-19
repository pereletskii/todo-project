const Users = require('../models/users'); 
const bcrypt = require('bcrypt');

const userController = async (req, res) => {
    const body = req.body;
    const user_id = req.user_info.id;

    const user = await Users.findOne({ where:{ id: user_id } });
    var password = user.password;
    var salt = user.salt;

    console.log(user.password, typeof password)
    await bcrypt.compare(body.password, password).then(async function(result) {
        if (!result) {
            salt = await bcrypt.genSalt(10);
            password = await bcrypt.hash(body.password, salt);
        }
    })
    
    await Users.update(
        {
            user_name: body.user_name,
            email: body.email,
            password: password,
            salt: salt
        },
        { where: { id: user.id } }
    )

    let updated = await Users.findOne({ where:{ id: user_id } })

    return res.status(201).json({
        success: true,
        message: updated.toJSON()
    });
}

module.exports = userController;