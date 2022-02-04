'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
     await queryInterface.bulkInsert('ProductPhotos', [
      {
        id: 'ec9872d5-13e6-45ce-97c0-b9c29d9e19d1',
        title: 'photo 1',
        url: "https://m.media-amazon.com/images/I/51q2t2DUpaL._AC_SX425_.jpg",
        productId: "ed459065-8372-4cc7-bfa3-98d68650ca95",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 'f3ece232-8660-459f-ac86-b4cb3d6c8ed1',
        title: 'photo 2',
        url: "https://m.media-amazon.com/images/I/61jZqsS3sPL._AC_SX466_.jpg",
        productId: "ed459065-8372-4cc7-bfa3-98d68650ca95",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
     await queryInterface.bulkDelete('ProductPhotos', null, {});
  }
};
