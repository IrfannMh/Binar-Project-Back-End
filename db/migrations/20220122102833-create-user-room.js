'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('UserRooms', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4
      },
      isWinner: {
        type: Sequelize.BOOLEAN,
        defaultValue:false
      },
      roomId: {
        type: Sequelize.UUID,
        references:{
          model:{
            tableName: "Rooms"
          },
          key: "id"
        }
      },
      participantId: {
        type: Sequelize.STRING,
        references:{
          model:{
            tableName: "Users"
          },
          key: "id"
        }
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
    await queryInterface.dropTable('UserRooms');
  }
};