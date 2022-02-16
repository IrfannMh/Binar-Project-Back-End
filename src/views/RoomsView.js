const { getTimestamp } = require('../services/GlobalServices');

class RoomView {
  constructor({
    id,
    name,
    startAt,
    finishAt,
    isOpen,
    RoomProducts,
    UserRooms,
    User,
    createdAt,
    updatedAt,
  }) {
    this.id = id;
    this.name = name;
    this.startAt = startAt;
    this.finishAt = finishAt;
    this.isOpen = isOpen;
    this.RoomProducts = RoomProducts;
    this.UserRooms = UserRooms;
    this.User = User;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  toJSON() {
    return {
      id: this.id,
      name: this.name,
      photoUrl: this.RoomProducts[0]?.ProductPhotos[0].url || '',
      startAt: getTimestamp(this.startAt),
      finishAt: getTimestamp(this.finishAt),
      location: this.User.UserAddress.province,
      isOpen: this.isOpen,
      totalParticipants: this.UserRooms.length,
      totalProducts: this.RoomProducts.length,
      products: this.products,
      createdAt: getTimestamp(this.createdAt),
      updatedAt: getTimestamp(this.updatedAt),
    };
  }
}

module.exports = RoomView;
