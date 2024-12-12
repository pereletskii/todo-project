'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addConstraint('lists', {
      type: 'foreign key',
      name: 'FK_lists_users',
      references: {
        table: 'users',
        field: 'id'
      },
      onDelete: 'no action',
      onUpdate: 'no action'
    })
    await queryInterface.addConstraint('tasks', {
      type: 'foreign key',
      name: 'FK_tasks_lists',
      references: {
        table: 'lists',
        field: 'id'
      },
      onDelete: 'no action',
      onUpdate: 'no action' 
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeConstraint('lists', 'FK_lists_users');
    await queryInterface.removeConstraint('tasks', 'FK_tasks_lists');
  }
};
