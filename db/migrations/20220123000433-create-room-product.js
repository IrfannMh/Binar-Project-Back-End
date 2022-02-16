'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('RoomProducts', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4
      },
      name: {
        type: Sequelize.STRING
      },
      qty: {
        type: Sequelize.INTEGER
      },
      description: {
        type: Sequelize.TEXT
      },
      roomId: {
        type: Sequelize.UUID
      },
      categoryId: {
        type: Sequelize.INTEGER,
        references:{
          model:{
            tableName: 'ProductCategories'
          }, key: 'id'
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
    await queryInterface.dropTable('RoomProducts');
  }
};