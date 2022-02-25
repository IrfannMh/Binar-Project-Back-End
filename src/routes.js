const multer = require('multer');
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
  deleteProductPhoto,
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
const { verifyUser } = require('./middleware/user');
const asyncWrapper = require('./plugins/asyncWrapper');
const imagekit = require('./config/imagekit');

const uploader = multer();

module.exports = (router) => {
  router.get('/', handleGetRoot);

  router.post('/api/v1/register', authenticate, registerAnUser);
  router.get('/api/v1/users', handleGetAllUser);
  router.get('/api/v1/users/:id', handleGetUser);
  router.put('/api/v1/users/:id', authenticate, handleUpdateUser);
  router.delete('/api/v1/users/:id', authenticate, handleDeleteUser);

  router.post('/api/v1/products', authenticate, verifyUser, createRoomProducts);
  router.get('/api/v1/products', getRoomProducts);
  router.get('/api/v1/products/:id', getProducts);

  router.post(
    '/api/v1/products/:id/photos',
    authenticate,
    verifyUser,
    uploader.single('productPhoto'),
    addProductPhoto
  );

  router.delete(
    '/api/v1/products/:id/photos/:photoId',
    authenticate,
    verifyUser,
    deleteProductPhoto
  );

  router.put('/api/v1/products/:id', authenticate, verifyUser, updateProduct);
  router.delete(
    '/api/v1/products/:id',
    authenticate,
    verifyUser,
    deleteProduct
  );

  router.get('/api/v1/categories', handleGetAllProductCategories);
  router.get('/api/v1/categories/:id', handleGetProductCategories);
  router.put(
    '/api/v1/categories/:id',
    authenticate,
    verifyUser,
    handleUpdateProductCategories
  );
  router.delete(
    '/api/v1/categories/:id',
    authenticate,
    verifyUser,
    handleDeleteProductCategories
  );
  router.post('/api/v1/categories', authenticate, handlePostProductCategories);

  router.post('/api/v1/rooms', authenticate, verifyUser, createRoom);
  router.get('/api/v1/rooms', getRooms);
  router.get('/api/v1/rooms/:id', getARoom);
  router.put(
    '/api/v1/rooms/:id',
    authenticate,
    verifyUser,
    verifyRoomOwner,
    updateRoom
  );
  router.delete(
    '/api/v1/rooms/:id',
    authenticate,
    verifyUser,
    verifyRoomOwner,
    deleteRoom
  );
  router.post('/api/v1/rooms/:id/join', authenticate, verifyUser, joinAnRoom);
  router.post(
    '/api/v1/rooms/:id/leave',
    authenticate,
    verifyUser,
    leaveFromRoom
  );
  router.get(
    '/api/v1/rooms/:id/find_winner',
    authenticate,
    verifyUser,
    verifyRoomOwner,
    findWinners
  );

  return router;
};
