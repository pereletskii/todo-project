const { DataTypes } = require('sequelize');
const sequelize = require('../database');

module.exports = sequelize.define('lists',
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
    owner_id: {
      allowNull: false,
      type: DataTypes.UUID
    }
  }
);