const { handleGetRoot } = require('./controllers/MainController');
const {
  registerAnUser,
  handleGetAllUser,
  handleGetUser,
  handleUpdateUser,
  handleDeleteUser,
} = require('./controllers/UserController');
const {
  getRoomProducts,
  getProducts,
  createRoomProducts,
  addProductPhoto,
  updateProduct,
  deleteProduct,
} = require('./controllers/RoomProductController');
const {
  handleGetAllProductCategories,
  handleGetProductCategories,
  handleUpdateProductCategories,
  handleDeleteProductCategories,
  handlePostProductCategories,
} = require('./controllers/ProductCategoriesController');

const authenticate = require('./middleware/auth');
const {
  getRooms,
  createRoom,
  getARoom,
  updateRoom,
  joinAnRoom,
  leaveFromRoom,
  findWinners,
  deleteRoom,
} = require('./controllers/RoomController');
const { verifyRoomOwner } = require('./middleware/room');

module.exports = (router) => {
  router.get('/', handleGetRoot);

  router.post('/api/v1/register', authenticate, registerAnUser);
  router.get('/api/v1/users', handleGetAllUser);
  router.get('/api/v1/users/:id', handleGetUser);
  router.put('/api/v1/users/:id', authenticate, handleUpdateUser);
  router.delete('/api/v1/users/:id', authenticate, handleDeleteUser);

  router.post('/api/v1/products', authenticate, createRoomProducts);
  router.get('/api/v1/products', getRoomProducts);
  router.get('/api/v1/products/:id', getProducts);
  router.post('/api/v1/products/:id/photos', authenticate, addProductPhoto);
  router.put('/api/v1/products/:id', authenticate, updateProduct);
  router.delete('/api/v1/products/:id', authenticate, deleteProduct);

  router.get('/api/v1/categories', handleGetAllProductCategories);
  router.get('/api/v1/categories/:id', handleGetProductCategories);
  router.put(
    '/api/v1/categories/:id',
    authenticate,
    handleUpdateProductCategories
  );
  router.delete(
    '/api/v1/categories/:id',
    authenticate,
    handleDeleteProductCategories
  );
  router.post('/api/v1/categories', authenticate, handlePostProductCategories);

  router.post('/api/v1/rooms', authenticate, createRoom);
  router.get('/api/v1/rooms', getRooms);
  router.get('/api/v1/rooms/:id', getARoom);
  router.put('/api/v1/rooms/:id', authenticate, verifyRoomOwner, updateRoom);
  router.delete('/api/v1/rooms/:id', authenticate, verifyRoomOwner, deleteRoom);
  router.post('/api/v1/rooms/:id/join', authenticate, joinAnRoom);
  router.post('/api/v1/rooms/:id/leave', authenticate, leaveFromRoom);
  router.get(
    '/api/v1/rooms/:id/find_winner',
    authenticate,
    verifyRoomOwner,
    findWinners
  );

  return router;
};
