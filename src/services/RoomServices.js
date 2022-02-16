const { Rooms, RoomProduct, UserRoom, User } = require('../models');

exports.getAllRooms = async () =>
  Rooms.findAll({
    include: [
      {
        model: RoomProduct,
      },
      { model: UserRoom },
    ],
  });

exports.verifyUser = async ({ uid }) => {
  const user = await User.findByPk(uid);
  return user;
};
