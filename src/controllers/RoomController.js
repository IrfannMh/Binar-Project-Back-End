const RoomView = require('../views/RoomsView');
const asyncWrapper = require('../plugins/asyncWrapper');
const {
  getAllRooms,
  createNewRoom,
  getDetailedRoom,
  editDetailRoom,
  addUserToRoom,
  removeUserFromRoom,
  findTheWinner,
} = require('../services/RoomServices');
const {
  REQURIED_FIELD,
  NOT_FOUND,
  ALREADY_JOIN,
  NOT_FOUND_USER,
  LEFT_THE_ROOM,
  JOIN_THE_ROOM,
  NULL_PARTICIPANT,
  ROOM_IS_CLOSED,
} = require('../utils/constants');
const RoomDetailView = require('../views/RoomDetailView');
const WinnerView = require('../views/WinnerViews');

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

  return res.ok(201, {
    name: JOIN_THE_ROOM,
    message: 'You have join the room!',
  });
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
    name: LEFT_THE_ROOM,
    message: 'You have left the room',
  });
});

exports.findWinners = asyncWrapper(async (req, res) => {
  const winners = await findTheWinner(req.params.id);

  if (winners === NULL_PARTICIPANT) {
    return res.fail(200, {
      name: NULL_PARTICIPANT,
      message: 'No one has joined the room yet!',
    });
  }

  if (winners === ROOM_IS_CLOSED) {
    return res.fail(200, {
      name: ROOM_IS_CLOSED,
      message: 'The room is closed! check the detail room to get the winner',
    });
  }

  const response = new WinnerView(winners);
  return res.ok(200, response);
});
