const RoomView = require('../views/RoomsView');
const asyncWrapper = require('../plugins/asyncWrapper');
const { getAllRooms, verifyUser } = require('../services/RoomServices');

exports.createRoom = asyncWrapper(async (req, res) => {
  const {
    name,
    photoUrl,
    startAt,
    finishAt,
    description,
    maxWinner = 1,
  } = req.body;
  const user = await verifyUser(req.userId);

  return res.ok(200, {
    name,
    photoUrl,
    startAt,
    finishAt,
    description,
    maxWinner,
    user,
  });
});

exports.getRooms = asyncWrapper(async (req, res) => {
  const rooms = await getAllRooms();

  const response = rooms.map((room) => new RoomView(room));

  return res.ok(200, response);
});
