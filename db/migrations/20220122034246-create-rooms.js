'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Rooms', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4
      },
      name: {
        type: Sequelize.STRING
      },
      startAt: {
        type: Sequelize.DATE
      },
      finishAt: {
        type: Sequelize.DATE
      },
      description: {
        type: Sequelize.TEXT
      },
      ownerId: {
        type: Sequelize.STRING,
        references:{
          model:{
            tableName: 'Users'
          },
          key: 'id'
        }
      },
      isOpen: {
        type: Sequelize.BOOLEAN,
        defaultValue: true
      },
      maxWinner: {
        type: Sequelize.INTEGER
      },
      totalParticipant: {
        type: Sequelize.INTEGER,
        defaultvalue: 0
      },
      totalProduct: {
        type: Sequelize.INTEGER,
        defaultvalue: 0
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
    await queryInterface.dropTable('Rooms');
  }
};