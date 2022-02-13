const RoomView = require('../views/RoomsView');
const asyncWrapper = require('../plugins/asyncWrapper');
const {
  getAllRooms,
  createNewRoom,
  getDetailedRoom,
  editDetailRoom,
  addUserToRoom,
  removeUserFromRoom,
} = require('../services/RoomServices');
const {
  REQURIED_FIELD,
  NOT_FOUND,
  ALREADY_JOIN,
  NOT_ROOM_PARTICIPANT,
  NOT_FOUND_USER,
  LEFT_FROM_ROOM,
} = require('../utils/constants');
const RoomDetailView = require('../views/RoomDetailView');

exports.createRoom = asyncWrapper(async (req, res) => {
  const room = await createNewRoom({ reqBody: req.body, uid: req.user.uid });

  if (room === REQURIED_FIELD) {
    return res.fail(400, {
      name: REQURIED_FIELD,
      message: 'Pleace check requried field',
    });
  }

  const response = new RoomDetailView(await getDetailedRoom(room.id));
  return res.ok(201, response);
});

exports.getRooms = asyncWrapper(async (req, res) => {
  const rooms = await getAllRooms();

  const response = rooms.map((room) => new RoomView(room));

  return res.ok(200, response);
});

exports.getARoom = asyncWrapper(async (req, res) => {
  const room = await getDetailedRoom(req.params.id);

  if (room === NOT_FOUND) {
    return res.fail(400, {
      name: NOT_FOUND,
      message: 'Pleace check roomId, room not found!',
    });
  }

  const response = new RoomDetailView(room);

  return res.ok(200, response);
});

exports.updateRoom = asyncWrapper(async (req, res) => {
  const room = await editDetailRoom({
    reqBody: req.body,
    roomId: req.params.id,
  });

  if (room === REQURIED_FIELD) {
    return res.fail(400, {
      name: REQURIED_FIELD,
      message: 'Pleace check requried field',
    });
  }

  if (room === NOT_FOUND) {
    return res.fail(400, {
      name: NOT_FOUND,
      message: 'Pleace check roomId, room not found!',
    });
  }

  const response = new RoomDetailView(await getDetailedRoom(req.params.id));
  return res.ok(201, response);
});

exports.joinAnRoom = asyncWrapper(async (req, res) => {
  const userRoom = await addUserToRoom({
    roomId: req.params.id,
    userId: req.user.uid,
  });

  if (userRoom === NOT_FOUND) {
    return res.fail(400, {
      name: NOT_FOUND,
      message: 'Pleace check roomId, room not found!',
    });
  }

  if (userRoom === ALREADY_JOIN) {
    return res.fail(400, {
      name: ALREADY_JOIN,
      message: 'You have joined the room!',
    });
  }

  return res.ok(201, userRoom);
});

exports.leaveFromRoom = asyncWrapper(async (req, res) => {
  const userRoom = await removeUserFromRoom({
    roomId: req.params.id,
    userId: req.user.uid,
  });

  if (userRoom === NOT_FOUND) {
    return res.fail(400, {
      name: NOT_FOUND,
      message: 'Pleace check roomId, room not found!',
    });
  }

  if (userRoom === NOT_FOUND_USER) {
    return res.fail(400, {
      name: NOT_FOUND_USER,
      message: 'You are not a room participant!',
    });
  }

  return res.ok(200, {
    name: LEFT_FROM_ROOM,
    message: 'You have left the room',
  });
});
