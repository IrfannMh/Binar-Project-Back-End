module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('UserDetails', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
      },
      displayName: {
        type: Sequelize.STRING,
      },
      firstname: {
        type: Sequelize.STRING,
      },
      lastname: {
        type: Sequelize.STRING,
      },
      gender: {
        type: Sequelize.ENUM('LAKI_LAKI', 'PEREMPUAN'),
      },
      birthday: {
        type: Sequelize.DATE,
      },
      address: {
        type: Sequelize.TEXT,
      },
      phoneNumber: {
        type: Sequelize.STRING,
      },
      userId: {
        type: Sequelize.STRING,
        onDelete: 'CASCADE',
        references: {
          model: {
            tableName: 'Users',
          },
          key: 'id',
        },
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('UserDetails');
  },
};
