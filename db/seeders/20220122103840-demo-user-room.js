'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */

     await queryInterface.bulkInsert('UserRooms', [
      {
        id: 'c8b6985b-e148-4a1e-b3d3-ea04756ccaf4',
        isWinner: true,
        roomId: '1ee92316-41ab-4fc9-bcfa-413ed0fa99f2',
        participantId: '5wv0eDIQSXhdxzmCdokWKOeaamu1',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
     await queryInterface.bulkDelete('UserRooms', null, {});
  }
};
