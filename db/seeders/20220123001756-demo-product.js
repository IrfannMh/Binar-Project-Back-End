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
     await queryInterface.bulkInsert('RoomProducts', [
      {
        id: 'ed459065-8372-4cc7-bfa3-98d68650ca95',
        name: "Jas Kerja",
        qty: 1,
        description: 'Jas untuk kerja kantoran',
        roomId: '1ee92316-41ab-4fc9-bcfa-413ed0fa99f2',
        categoryId: 2,
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
     await queryInterface.bulkDelete('RoomProducts', null, {});
  }
};
