'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('gpt_requests', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      group_size: {
        type: Sequelize.STRING,
      },
      destination: {
        type: Sequelize.STRING,
      },
      budget: {
        type: Sequelize.STRING,
      },
      travel_style: {
        type: Sequelize.STRING,
      },
      activity_type: {
        type: Sequelize.STRING,
      },
      cuisine_type: {
        type: Sequelize.STRING,
      },
      interests_new: {
        type: Sequelize.STRING,
      },
      start_time: {
        type: Sequelize.STRING,
      },
      end_time: {
        type: Sequelize.STRING,
      },
      interests_new: {
        type: Sequelize.STRING,
      },
      output: {
        type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: false,
        defaultValue: new Date(),
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        defaultValue: new Date(),
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('gpt_requests');
  },
};
