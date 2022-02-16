const { getTimestamp } = require('../services/GlobalServices');

class RoomView {
  constructor({
    id,
    name,
    photoUrl,
    location,
    startAt,
    finishAt,
    isOpen,
    RoomProducts,
    UserRooms,
    createdAt,
    updatedAt,
  }) {
    this.id = id;
    this.name = name;
    this.photoUrl = photoUrl;
    this.location = location;
    this.startAt = startAt;
    this.finishAt = finishAt;
    this.isOpen = isOpen;
    this.RoomProducts = RoomProducts;
    this.UserRooms = UserRooms;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  toJSON() {
    return {
      id: this.id,
      name: this.name,
      photoUrl: this.photoUrl,
      startAt: getTimestamp(this.startAt),
      finishAt: getTimestamp(this.finishAt),
      isOpen: this.isOpen,
      totalParticipants: this.UserRooms.length,
      totalProducts: this.RoomProducts.length,
      location: this.location,
      products: this.products,
      createdAt: getTimestamp(this.createdAt),
      updatedAt: getTimestamp(this.updatedAt),
    };
  }
}

module.exports = RoomView;
