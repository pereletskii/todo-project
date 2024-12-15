const { Sequelize } = require('sequelize');

const config = require('./env_config.json')[process.env.NODE_ENV || 'development'];

const sequelize = new Sequelize(config);

module.exports = sequelize;