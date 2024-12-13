const { DataTypes } = require('sequelize');
const sequelize = require('../database');
const Joi = require('joi');

module.exports = sequelize.define('users',
  {
    id: {
      primaryKey: true,
      allowNull: false,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    user_name: {
      allowNull: false,
      type: DataTypes.STRING
    },
    email: {
      allowNull: false,
      type: DataTypes.STRING,
      unique: true
    },
    password: {
      allowNull: false,
      type: DataTypes.STRING
    },
    salt: {
      allowNull: false,
      type: DataTypes.STRING
    }
  },
  {
    createdAt: false,
    updatedAt: false
  }
);

function validateUser(user) {
  const schema = Joi.object({
      user_name: Joi.string().min(3).max(100).required(),
      email: Joi.string().min(5).max(255).required().email(),
      password: Joi.string().min(8).max(100).required()
  })
  return schema.validate(user)
}

module.exports.validate = validateUser