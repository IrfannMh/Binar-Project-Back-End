"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Rooms extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.User, { foreignKey: "ownerId", as: "roomOwner" });
    }
  }
  Rooms.init(
    {
      id: {
        primaryKey: true,
        type: DataTypes.UUID,
        allowNull: false,
      },
      name: DataTypes.STRING,
      startAt: DataTypes.DATE,
      finishAt: DataTypes.DATE,
      description: DataTypes.TEXT,
      ownerId: DataTypes.STRING,
      isOpen: DataTypes.BOOLEAN,
      maxWinner: DataTypes.INTEGER,
      totalParticipant: DataTypes.INTEGER,
      totalProduct: DataTypes.INTEGER,
      photoUrl: DataTypes.STRING
    },
    {
      sequelize,
      modelName: "Rooms",
    }
  );
  return Rooms;
};
