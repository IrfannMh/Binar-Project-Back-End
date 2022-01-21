const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class UserDetail extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.User, { foreignKey: 'userId', as: 'userDetail' });
    }
  }
  UserDetail.init(
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      displayName: DataTypes.STRING,
      firstname: DataTypes.STRING,
      lastname: DataTypes.STRING,
      gender: DataTypes.ENUM('LAKI_LAKI', 'PEREMPUAN'),
      birthday: DataTypes.DATE,
      address: DataTypes.TEXT,
      phoneNumber: DataTypes.STRING,
      userId: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'UserDetail',
    }
  );
  return UserDetail;
};
