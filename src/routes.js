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

const authorize = require('./middleware/auth');
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

module.exports = (router) => {
  router.get('/', handleGetRoot);

  router.post('/api/v1/register', authorize, registerAnUser);
  router.get('/api/v1/users', handleGetAllUser);
  router.get('/api/v1/users/:id', handleGetUser);
  router.put('/api/v1/users/:id', authorize, handleUpdateUser);
  router.delete('/api/v1/users/:id', authorize, handleDeleteUser);

  router.post('/api/v1/products', authorize, createRoomProducts);
  router.get('/api/v1/products', getRoomProducts);
  router.get('/api/v1/products/:id', getProducts);
  router.post('/api/v1/products/:id/photos', authorize, addProductPhoto);
  router.put('/api/v1/products/:id', authorize, updateProduct);
  router.delete('/api/v1/products/:id', authorize, deleteProduct);

  router.get('/api/v1/categories', handleGetAllProductCategories);
  router.get('/api/v1/categories/:id', handleGetProductCategories);
  router.put(
    '/api/v1/categories/:id',
    authorize,
    handleUpdateProductCategories
  );
  router.delete(
    '/api/v1/categories/:id',
    authorize,
    handleDeleteProductCategories
  );
  router.post('/api/v1/categories', authorize, handlePostProductCategories);

  router.post('/api/v1/rooms', authorize, createRoom);
  router.get('/api/v1/rooms', getRooms);
  router.get('/api/v1/rooms/:id', getARoom);
  router.put('/api/v1/rooms/:id', authorize, updateRoom);
  router.delete('/api/v1/rooms/:id', authorize, deleteRoom);
  router.post('/api/v1/rooms/:id/join', authorize, joinAnRoom);
  router.post('/api/v1/rooms/:id/leave', authorize, leaveFromRoom);
  router.get('/api/v1/rooms/:id/find_winner', authorize, findWinners);

  return router;
};
