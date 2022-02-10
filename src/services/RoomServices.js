const {
  Rooms,
  RoomProduct,
  UserRoom,
  User,
  UserAddress,
  ProductPhoto,
} = require("../models");

exports.getAllRooms = async () =>
  Rooms.findAll({
    include: [
      {
        model: RoomProduct,
        include: { model: ProductPhoto },
      },
      { model: UserRoom },
      { model: User, include: { model: UserAddress } },
    ],
  });

exports.verifyUser = async ({ uid }) => {
  const user = await User.findByPk(uid);
  return user;
};
