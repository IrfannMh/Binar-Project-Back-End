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
     await queryInterface.bulkInsert('Rooms', [
      {
        id: '1ee92316-41ab-4fc9-bcfa-413ed0fa99f2',
        name: 'Giveaway Launching LepasAja',
        startAt: new Date(),
        finishAt: new Date(),
        description: "Giveaway launhing aplikasi lepasAja",
        ownerId: '5wv0eDIQSXhdxzmCdokWKOeaamu1',
        maxWinner: 1,
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
     await queryInterface.bulkDelete('Rooms', null, {});
  }
};
