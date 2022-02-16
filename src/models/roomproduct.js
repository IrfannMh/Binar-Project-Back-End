const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class RoomProduct extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Rooms, {foreignKey: 'roomId'})
      this.belongsTo(models.ProductCategory, {foreignKey: 'categoryId'})
      this.hasMany(models.ProductPhoto, {foreignKey: 'productId'})
    }
  }
  RoomProduct.init(
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      name: DataTypes.STRING,
      qty: DataTypes.INTEGER,
      description: DataTypes.TEXT,
      roomId: DataTypes.UUID,
      categoryId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'RoomProduct',
    }
  );
  return RoomProduct;
};
