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
     await queryInterface.bulkInsert('UserAddresses', [
      {
        id: 'abea5bf3-07a7-4602-bf22-d9df04109c3a',
        address: "Sebelah kanan kuburan",
        street: "Jl. kesana aja",
        city: "Sleman",
        province: "DIY",
        zipCode: 12365,
        userId: '5wv0eDIQSXhdxzmCdokWKOeaamu1',
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
     await queryInterface.bulkDelete('UserAddresses', null, {});
  }
};
