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
const {
  REQURIED_FIELD,
  NOT_FOUND,
  ALREADY_JOIN,
  NOT_FOUND_USER,
  NULL_PARTICIPANT,
  ROOM_IS_CLOSED,
} = require('../utils/constants');
const { getStandartDate } = require('../utils/time');
const { checkValidUUID } = require('../utils/uuid');
const { createUUID } = require('./GlobalServices');

const isUserJoined = async ({ roomId, userId }) => {
  const user = await UserRoom.findOne({
    where: { roomId, participantId: userId },
  });

  if (user) return true;
};

const findRoom = async (id) => {
  const room = await Rooms.findByPk(id);

  if (room) return true;
};

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

exports.getDetailedRoom = async (roomId) => {
  if (!checkValidUUID(roomId)) return NOT_FOUND;

  const checkRoom = await findRoom(roomId);
  if (!checkRoom) return NOT_FOUND;

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

exports.editDetailRoom = async ({ reqBody, roomId }) => {
  const {
    name,
    startAt,
    finishAt,
    description,
    condition,
    maxWinner = 1,
  } = reqBody;

  if (!checkValidUUID(roomId)) return NOT_FOUND;

  if (!name || !startAt || !finishAt || !description) return REQURIED_FIELD;

  const checkRoom = await findRoom(roomId);

  if (!checkRoom) return NOT_FOUND;

  const room = await Rooms.update(
    {
      name,
      startAt: getStandartDate(startAt),
      finishAt: getStandartDate(finishAt),
      description: description?.trim(),
      maxWinner,
      condition: condition?.trim(),
    },
    {
      where: {
        id: roomId,
      },
    }
  );

  return room;
};

exports.addUserToRoom = async ({ roomId, userId }) => {
  if (!checkValidUUID(roomId)) return NOT_FOUND;

  const checkRoom = await findRoom(roomId);
  if (!checkRoom) return NOT_FOUND;

  const checkUser = await isUserJoined({ roomId, userId });
  if (checkUser) return ALREADY_JOIN;

  const userRoom = await UserRoom.create({
    id: createUUID(),
    isWinner: false,
    roomId,
    participantId: userId,
  });

  return userRoom;
};

exports.removeUserFromRoom = async ({ roomId, userId }) => {
  if (!checkValidUUID(roomId)) return NOT_FOUND;

  const checkRoom = await findRoom(roomId);
  if (!checkRoom) return NOT_FOUND;

  const checkUser = await isUserJoined({ roomId, userId });
  if (!checkUser) return NOT_FOUND_USER;

  const userRoom = await UserRoom.destroy({
    where: {
      roomId,
      participantId: userId,
    },
  });

  return userRoom;
};

const getWinnerId = (participants) => {
  const newParticipant = participants.map((participant, index) => ({
    seatNumber: index,
    participantId: participant.participantId,
  }));

  const rundomNumber = Math.round(Math.random() * (newParticipant.length - 1));

  const theWinner = newParticipant.find(
    (participant) => participant.seatNumber === rundomNumber
  );

  return theWinner.participantId;
};

const changeWinnerStatus = async (winnerId) => {
  const userRoom = await UserRoom.update(
    { isWinner: true },
    { where: { participantId: winnerId } }
  );
  return userRoom;
};

const changeRoomStatus = async (roomId) => {
  const room = await Rooms.update({ isOpen: false }, { where: { id: roomId } });
  return room;
};

const checkRoomStatus = async (roomId) => {
  const room = await Rooms.findByPk(roomId);
  return room.isOpen;
};

const getDetailWinner = async (roomId, winnerId) => {
  const detail = await UserRoom.findOne({
    where: { roomId, participantId: winnerId },
    include: [{ model: Rooms }, { model: User, include: UserDetail }],
  });

  return detail;
};

exports.findTheWinner = async (roomId) => {
  const userRoom = await UserRoom.findAll({ where: { roomId } });

  if (userRoom.length < 1) return NULL_PARTICIPANT;

  const isRoomOpen = await checkRoomStatus(roomId);

  if (!isRoomOpen) return ROOM_IS_CLOSED;

  const winnerId = getWinnerId(userRoom);
  await changeWinnerStatus(winnerId);
  await changeRoomStatus(roomId);

  const detailWinner = await getDetailWinner(roomId, winnerId);
  return detailWinner;
};
