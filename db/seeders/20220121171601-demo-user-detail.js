module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    await queryInterface.bulkInsert('UserDetails', [
      {
        id: '91ea07e1-2375-4789-8a80-19c8bb73cd2b',
        displayName: 'User 1',
        firstname: 'User',
        lastname: '1',
        userId: '5wv0eDIQSXhdxzmCdokWKOeaamu1',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('UserDetails', null, {});
  },
};
