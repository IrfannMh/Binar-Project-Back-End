const RoomView = require('../views/RoomsView');
const asyncWrapper = require('../plugins/asyncWrapper');
const {
  getAllRooms,
  createNewRoom,
  getDetailedRooms,
} = require('../services/RoomServices');
const { REQURIED_FIELD } = require('../utils/constants');
const RoomDetailView = require('../views/RoomDetailView');

exports.createRoom = asyncWrapper(async (req, res) => {
  const room = await createNewRoom({ reqBody: req.body, uid: req.user.uid });

  if (room === REQURIED_FIELD) {
    return res.fail(400, {
      name: REQURIED_FIELD,
      message: 'Pleace check requried field',
    });
  }

  const response = new RoomDetailView(await getDetailedRooms(room.id));
  return res.ok(201, response);
});

exports.getRooms = asyncWrapper(async (req, res) => {
  const rooms = await getAllRooms();

  const response = rooms.map((room) => new RoomView(room));

  return res.ok(200, response);
});
