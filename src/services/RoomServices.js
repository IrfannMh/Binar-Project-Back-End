const {
  Rooms,
  RoomProduct,
  UserRoom,
  User,
  UserAddress,
  ProductPhoto,
  UserDetail,
  ProductCategory,
} = require('../models');
const { REQURIED_FIELD } = require('../utils/constants');
const { getStandartDate } = require('../utils/time');
const { createUUID } = require('./GlobalServices');

exports.createNewRoom = async ({ reqBody, uid }) => {
  const {
    name,
    startAt,
    finishAt,
    description,
    condition,
    maxWinner = 1,
  } = reqBody;

  if (!name || !startAt || !finishAt || !description) return REQURIED_FIELD;

  const room = await Rooms.create({
    id: createUUID(),
    name,
    startAt: getStandartDate(startAt),
    finishAt: getStandartDate(finishAt),
    description: description?.trim(),
    ownerId: uid,
    isOpen: true,
    maxWinner,
    totalParticipant: 0,
    totalProduct: 0,
    condition: condition?.trim(),
  });

  return room;
};

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

exports.getDetailedRooms = async (roomId) => {
  const room = await Rooms.findOne({
    where: {
      id: roomId,
    },
    include: [
      {
        model: RoomProduct,
        include: [{ model: ProductPhoto }, { model: ProductCategory }],
      },
      { model: UserRoom, include: [{ model: User, include: UserDetail }] },
      { model: User, include: UserDetail },
    ],
  });

  return room;
};
