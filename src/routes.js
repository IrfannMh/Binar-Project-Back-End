const { handleGetRoot } = require('./controllers/MainController');
const { getRooms, createRoom } = require('./controllers/RoomController');
const {
  registerAnUser,
  handleGetAllUser,
  handleGetUser,
  handleUpdateUser,
  handleDeleteUser,
} = require('./controllers/UserController');
const authorize = require('./middleware/auth');

module.exports = (router) => {
  router.get('/', handleGetRoot);

  router.post('/api/v1/register', authorize, registerAnUser);
  router.get('/api/v1/users', handleGetAllUser);
  router.get('/api/v1/users/:id', handleGetUser);
  router.put('/api/v1/users/:id', authorize, handleUpdateUser);
  router.delete('/api/v1/users/:id', authorize, handleDeleteUser);

  router.post('/api/v1/rooms', authorize, createRoom);
  router.get('/api/v1/rooms', getRooms);
  router.get('/api/v1/rooms/:id', getRooms);
  router.put('/api/v1/rooms/:id', authorize, getRooms);
  router.delete('/api/v1/rooms/:id', authorize, getRooms);
  router.post('/api/v1/rooms/:id/join', authorize, getRooms);
  router.post('/api/v1/rooms/:id/leave', authorize, getRooms);
  router.post('/api/v1/rooms/:id/find_winner', authorize, getRooms);

  return router;
};
