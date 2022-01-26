'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserRoom extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsToMany(models.User, {foreignKey: "participantId"})
      this.belongsToMany(models.Rooms, {foreignKey: "roomId"})
    }
  }
  UserRoom.init({
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    isWinner: DataTypes.BOOLEAN,
    roomId: DataTypes.UUID,
    participantId: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'UserRoom',
  });
  return UserRoom;
};