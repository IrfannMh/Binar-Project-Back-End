const { handleGetRoot } = require('./controllers/MainController');
const { getRooms } = require('./controllers/RoomController');

module.exports = (router) => {
  router.get('/', handleGetRoot);

  router.get('/api/v1/rooms', getRooms)

  return router;
};
