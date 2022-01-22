const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasOne(models.UserDetail, { foreignKey: 'userId' });
      this.hasMany(models.Room, {foreignKey: 'ownerId'})
    }
  }
  User.init(
    {
      id: {
        primaryKey: true,
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: DataTypes.STRING,
      photoUrl: DataTypes.STRING,
      emailVerified: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: 'User',
    }
  );
  return User;
};
