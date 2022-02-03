const RoomView = require('../views/RoomsView');
const asyncWrapper = require('../plugins/asyncWrapper');
const { getAllRooms } = require('../services/RoomServices');

exports.createRoom = asyncWrapper(async (req, res) => {
  // const {
  //   name,
  //   startAt,
  //   finishAt,
  //   description,
  //   photoUrl,
  //   ownerId,
  //   maxWinner = 1,
  // } = req.body;
  // if (!name || !startAt || !finishAt || !description) {
  //   return res.fail(
  //     400,
  //     'name, startAt, finishAt, and description are required !'
  //   );
  // }
  // const response = RoomView();
  // return res.ok(201, room);
});

exports.getRooms = asyncWrapper(async (req, res) => {
  const rooms = await getAllRooms();

  const response = rooms.map((room) => new RoomView(room));

  return res.ok(200, response);
});
