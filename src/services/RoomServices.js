const { Rooms, RoomProduct, UserRoom } = require('../models');

exports.getAllRooms = async () =>
  Rooms.findAll({
    include: [
      {
        model: RoomProduct,
      },
      { model: UserRoom },
    ],
  });
