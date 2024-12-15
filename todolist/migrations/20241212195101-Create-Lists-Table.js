'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('lists', {
      id: {
        primaryKey: true,
        allowNull: false,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING
      },
      owner_id: {
        allowNull: false,
        type: Sequelize.UUID
      }
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('lists');
  }
};
