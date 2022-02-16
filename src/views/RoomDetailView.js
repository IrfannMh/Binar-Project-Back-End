const { getTimestamp } = require("../services/GlobalServices");

class RoomDetailView {
  constructor({
    id,
    name,
    startAt,
    finishAt,
    description,
    condition,
    isOpen,
    maxWinner,
    photoUrl,
    User,
    RoomProducts,
    UserRooms,
    createdAt,
    updatedAt,
  }) {
    this.id = id;
    this.name = name;
    this.startAt = startAt;
    this.finishAt = finishAt;
    this.description = description
    this.condition = condition
    this.maxWinner = maxWinner
    this.photoUrl = maxWinner
    this.photoUrl = photoUrl
    this.isOpen = isOpen;
    this.User = User
    this.RoomProducts = RoomProducts
    this.UserRooms = UserRooms
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  #getParticipants (userRooms){
      return userRooms.map((user) =>{
          const {email, photoUrl, UserDetail} =  user.User
          const name = UserDetail.displayName
          return {email, photoUrl, name}
      })
  }

  #getProduct (roomProducts){
      return roomProducts.map((product) =>{
          const {name, qty, description, ProductCategory} = product
          const category = ProductCategory.name
          return {name, qty, description, category}
      })
  }

  #getWinner (userRooms) {
    return userRooms.filter((user) => user.isWinner === true).map((user) =>{
        const {email, photoUrl, UserDetail} =  user.User
        const name = UserDetail.displayName
        return {email, photoUrl, name}
    })
  }

  toJSON() {
    return {
      id: this.id,
      owner:this.User?.UserDetail?.displayName,
      name: this.name,
      photoUrl: this.RoomProducts[0]?.ProductPhotos[0].url || "",
      location: "",
      startAt: getTimestamp(this.startAt),
      finishAt: getTimestamp(this.finishAt),
      description: this.description,
      condition: this.condition,
      isOpen: this.isOpen,
      maxWinner: this.maxWinner,
      participants: this.#getParticipants(this.UserRooms),
      products: this.#getProduct(this.RoomProducts),
      winners: this.#getWinner(this.UserRooms),
      createdAt: getTimestamp(this.createdAt),
      updatedAt: getTimestamp(this.updatedAt),
    };
  }
}

module.exports = RoomDetailView;
