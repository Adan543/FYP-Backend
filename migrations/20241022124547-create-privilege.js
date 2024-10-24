'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Privileges', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      summarization: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue:0

      },
      ocr: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue:0
      },
      translation: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue:0
      },
      text_to_speech: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue:0
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    })
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Privileges');
  }
};