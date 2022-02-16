const { getTimestamp } = require('../services/GlobalServices');

class RoomProductsView {
  constructor({
    id,
    roomId,
    name,
    qty,
    Room,
    ProductCategory,
    createdAt,
    updatedAt,
    ProductPhotos,
  }) {
    this.id = id;
    this.roomId = roomId;
    this.name = name;
    this.qty = qty;
    this.ProductPhotos = ProductPhotos;
    this.ProductCategory = ProductCategory;
    this.Room = Room;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  toJSON() {
    return {
      id: this.id,
      roomId: this.roomId,
      name: this.name,
      qty: this.qty,
      location: this.Room?.User?.UserAddress?.province,
      category: this.ProductCategory.name,
      photoUrl: this.ProductPhotos[0]?.url,
      createdAt: getTimestamp(this.createdAt),
      updatedAt: getTimestamp(this.updatedAt),
    };
  }
}

module.exports = RoomProductsView;
