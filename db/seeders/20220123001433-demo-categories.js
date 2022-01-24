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

     await queryInterface.bulkInsert('ProductCategories', [
      {

        name: 'Makanan',
        description: 'Category product makanan(ringan, berat, dll)',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {

        name: 'Pakaian',
        description: 'Cateogry product pakaian(baju, celana, jaket, dll)',
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
     await queryInterface.bulkDelete('ProductCategories', null, {});
  }
};
