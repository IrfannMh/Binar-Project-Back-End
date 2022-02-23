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
        defaultValue: '',
      },
      firstname: {
        type: Sequelize.STRING,
        defaultValue: '',
      },
      lastname: {
        type: Sequelize.STRING,
        defaultValue: '',
      },
      gender: {
        type: Sequelize.ENUM('LAKI_LAKI', 'PEREMPUAN'),
      },
      birthday: {
        type: Sequelize.DATE,
      },
      address: {
        type: Sequelize.TEXT,
        defaultValue: '',
      },
      phoneNumber: {
        type: Sequelize.STRING,
        defaultValue: '',
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
