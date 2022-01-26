'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class RoomProduct extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.ProductCategory, {foreignKey: 'categoryId'})
    }
  }
  RoomProduct.init({
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    name: DataTypes.STRING,
    qty: DataTypes.INTEGER,
    description: DataTypes.TEXT,
    roomId: DataTypes.UUID,
    categoryId: DataTypes.INTEGER,
    photoUrl: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'RoomProduct',
  });
  return RoomProduct;
};