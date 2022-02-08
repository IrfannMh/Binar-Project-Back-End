const { handleGetRoot } = require('./controllers/MainController');
const { getRooms, createRoom } = require('./controllers/RoomController');
const authorize = require('./middleware/auth');

module.exports = (router) => {
  router.get('/', handleGetRoot);

  router.post('/api/v1/rooms',authorize, createRoom)
  router.get('/api/v1/rooms', getRooms)
  router.get('/api/v1/rooms/:id', getRooms)
  router.put('/api/v1/rooms/:id', authorize, getRooms)
  router.delete('/api/v1/rooms/:id', authorize, getRooms)
  router.post('/api/v1/rooms/:id/join', authorize, getRooms)
  router.post('/api/v1/rooms/:id/leave', authorize, getRooms)
  router.post('/api/v1/rooms/:id/find_winner', authorize, getRooms)

  return router;
};
