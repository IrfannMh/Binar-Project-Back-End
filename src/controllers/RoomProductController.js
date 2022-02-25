const RoomProductsView = require('../views/RoomProductsView');
const ProductView = require('../views/ProductView');
const asyncWrapper = require('../plugins/asyncWrapper');
const {
  findProduct,
  findProductNew,
  addRoomProducts,
  findCategory,
  checkProductField,
  getAllRoomProducts,
  addProductsPhoto,
  updateTableProduct,
  deleteTableProduct,
} = require('../services/RoomProductServices');
const { NOT_FOUND } = require('../utils/constants');
const ProductPhotoView = require('../views/ProductPhotoView');

exports.createRoomProducts = asyncWrapper(async (req, res) => {
  if (await checkProductField(req, res)) {
    return res.fail(400, {
      name: 'REQUIRED_FIELD',
      message: 'Please check required fields',
    });
  }

  const category = await findCategory(req);
  const addProduct = await addRoomProducts(req, category);

  const response = new ProductView(await findProductNew(addProduct));
  return res.ok(201, response);
});

exports.getRoomProducts = asyncWrapper(async (req, res) => {
  const roomproducts = await getAllRoomProducts();

  const response = roomproducts.map((product) => new RoomProductsView(product));

  return res.ok(200, response);
});

exports.getProducts = asyncWrapper(async (req, res) => {
  const roomproducts = await findProduct(req, res);

  if (!roomproducts) {
    return res.fail(404, {
      name: 'Not Found',
      message: null,
    });
  }

  const response = new ProductView(roomproducts);
  return res.ok(200, response);
});

exports.addProductPhoto = asyncWrapper(async (req, res) => {
  const addPhoto = await addProductsPhoto(req);

  if (addPhoto === NOT_FOUND) {
    return res.fail(404, {
      name: NOT_FOUND,
      message: 'Please check productId. product not found !',
    });
  }

  const response = new ProductPhotoView(addPhoto);
  return res.ok(201, response);
});

exports.updateProduct = asyncWrapper(async (req, res) => {
  const product = await findProduct(req, res);
  console.log('product', product);
  if (!product) {
    return res.fail(404, {
      name: 'Not Found',
      message: 'Product not exist',
    });
  }

  const category = await findCategory(req);

  console.log('id category', category);
  await updateTableProduct(req, category);

  const updatedProduct = new ProductView(await findProduct(req, res));
  return res.ok(200, updatedProduct);
});

exports.deleteProduct = asyncWrapper(async (req, res) => {
  const product = await findProduct(req, res);
  if (!product) {
    return res.fail(404, {
      name: 'Not Found',
      message: 'Product not exist',
    });
  }

  await deleteTableProduct(req);
  return res.ok(200, {});
});
