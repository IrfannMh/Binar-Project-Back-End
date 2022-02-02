'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ProductPhoto extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.ProductPhoto, {foreignKey: 'productId'})
    }
  };
  ProductPhoto.init({
    id: DataTypes.UUID,
    title: DataTypes.STRING,
    alt: DataTypes.STRING,
    url: DataTypes.STRING,
    productId: DataTypes.UUID
  }, {
    sequelize,
    modelName: 'ProductPhoto',
  });
  return ProductPhoto;
};