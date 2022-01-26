'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    return Promise.all([
      queryInterface.addColumn('RoomProducts', 'photoUrl', {
        type: Sequelize.STRING
      }),
      queryInterface.addColumn('Rooms', 'photoUrl', {
        type: Sequelize.STRING
      })
    ])
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
     return Promise.all([
      queryInterface.removeColumn('RoomProducts', 'photoUrl'),
      queryInterface.removeColumn('Rooms', 'photoUrl')
    ])
  }
};
