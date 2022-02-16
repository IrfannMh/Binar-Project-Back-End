const { getTimestamp } = require("../services/GlobalServices");

class RoomProductsView {
  constructor({ id, roomId, name, qty, Room, ProductCategory, description, createdAt, updatedAt, ProductPhotos }) {
    this.id = id;
    this.roomId = roomId;
    this.name = name;
    this.qty = qty;
    this.ProductPhotos = ProductPhotos;
    this.description = description;
    this.ProductCategory = ProductCategory;
    this.Room = Room;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  photoProduct(photos) {
    const { title, url, alt } = photos;
    return { title, url, alt };
  }

  toJSON() {
    return {
      id: this.id,
      roomId: this.roomId,
      name: this.name,
      photoUrl: this.ProductPhotos?.map((i) => this.photoProduct(i)),
      qty: this.qty,
      location: this.Room?.User?.UserAddress?.province,
      description: this.description,
      category: this.ProductCategory.name,
      createdAt: getTimestamp(this.createdAt),
      updatedAt: getTimestamp(this.updatedAt),
    };
  }
}

module.exports = RoomProductsView;
