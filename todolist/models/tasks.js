const { DataTypes } = require('sequelize');
const sequelize = require('../database');

module.exports = sequelize.define('tasks',
  {
    id: {
      primaryKey: true,
      allowNull: false,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    name: {
      allowNull: false,
      type: DataTypes.STRING
    },
    description: {
      allowNull: true,
      type: DataTypes.STRING
    },
    images: {
      allowNull: true,
      type: DataTypes.TEXT
    },
    list_id: {
      allowNull: false,
      type: DataTypes.UUID
    }
  }
);