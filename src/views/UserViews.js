const { getTimestamp } = require('../services/GlobalServices');

class UserView {
  constructor({
    id,
    email,
    photoUrl,
    emailVerified,
    UserAddress,
    UserDetail,
    createdAt,
    updatedAt,
  }) {
    this.id = id;
    this.email = email;
    this.photoUrl = photoUrl;
    this.emailVerified = emailVerified;
    this.UserAddress = UserAddress;
    this.UserDetail = UserDetail;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  userAddress(detailAddress) {
    const { address, street, city, province, zipCode } = detailAddress;
    return { address, street, city, province, zipCode };
  }

  toJSON() {
    return {
      id: this.id,
      email: this.email,
      emailVerified: this.emailVerified,
      displayName: this.UserDetail.displayName,
      firstname: this.UserDetail.firstname,
      lastname: this.UserDetail.lastname,
      birthday: this.UserDetail.birthday,
      gender: this.UserDetail.gender,
      address: this.userAddress(this.UserAddress),
      phoneNumber: this.UserDetail.phoneNumber,
      photoUrl: this.photoUrl,
      createdAt: getTimestamp(this.createdAt),
      updatedAt: getTimestamp(this.updatedAt),
    };
  }
}

module.exports = UserView;
