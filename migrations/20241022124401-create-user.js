'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      user_name: {
        type: Sequelize.STRING,
        allowNull:false
      },
      institution_name: {
        type: Sequelize.STRING,
      },
      country: {
        type: Sequelize.STRING,
        allowNull:false
      },
      
      email: {
        type: Sequelize.STRING(50),
        allowNull: false,
        },
      password: {
        type: Sequelize.STRING,
        allowNull: false,

      },

      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Users');
  }
};