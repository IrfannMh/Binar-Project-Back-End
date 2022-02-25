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
        id: '6218b077b028756ba44b0568',
        title: 'Default_Product_Photo_M4InQ1Ovo.png',
        url: "https://ik.imagekit.io/8ikxgq8bfhts/products/Default_Product_Photo_M4InQ1Ovo.png",
        productId: "ed459065-8372-4cc7-bfa3-98d68650ca95",
        createdAt: new Date(),
        updatedAt: new Date(),
      }
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
