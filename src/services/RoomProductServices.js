const imagekit = require('../config/imagekit');
const {
  RoomProduct,
  Rooms,
  ProductPhoto,
  ProductCategory,
  User,
  UserAddress,
} = require('../models');
const { NOT_FOUND } = require('../utils/constants');
const { checkValidUUID } = require('../utils/uuid');

exports.checkProductField = async (req, res) => {
  const { name, qty, description } = req.body;
  if (!name && !qty && !description) {
    return true;
  }
  return false;
};

exports.addRoomProducts = async (req, category) => {
  const { name, qty, description, roomId } = req.body;
  const newRoomProduct = await RoomProduct.create({
    name,
    description,
    qty,
    roomId,
    categoryId: category.id,
  });

  return newRoomProduct;
};

exports.findCategory = async (req) => {
  const { category } = req.body;
  const categoryProduct = await ProductCategory.findOne({
    where: {
      name: category,
    },
  });
  return categoryProduct;
};

exports.findProduct = async (req, res) => {
  const product = await RoomProduct.findOne({
    where: {
      id: req.params.id,
    },
    include: [
      { model: Rooms },
      { model: ProductPhoto },
      { model: ProductCategory },
    ],
  });
  return product;
};

exports.findProductNew = async (newProduct) => {
  const product = await RoomProduct.findOne({
    where: {
      id: newProduct.id,
    },
    include: [
      { model: Rooms },
      { model: ProductPhoto },
      { model: ProductCategory },
    ],
  });
  return product;
};

exports.getAllRoomProducts = async () => {
  const roomproducts = await RoomProduct.findAll({
    include: [
      { model: ProductPhoto },
      { model: ProductCategory },
      { model: Rooms, include: [{ model: User, include: UserAddress }] },
    ],
  });
  return roomproducts;
};

const getInfoProductPhoto = async (file, filename) => {
  const ext = file.originalname.split('.')[1];
  const fileName = `${filename}.${ext}`;

  const upload = await imagekit.upload({
    file: file.buffer.toString('base64'),
    fileName,
    folder: 'products',
  });

  return upload;
};

exports.addProductsPhoto = async (req) => {
  const { title, alt } = req.body;
  const { file } = req;
  const productId = req.params.id;

  if (!checkValidUUID(productId)) return NOT_FOUND;
  const checkProduct = await RoomProduct.findByPk(productId);
  if (!checkProduct) return NOT_FOUND;

  const filename = title || checkProduct.name;
  const uploadImage = await getInfoProductPhoto(file, filename);

  const addPhoto = await ProductPhoto.create({
    id: uploadImage.fileId,
    title: filename,
    alt: alt || filename,
    url: uploadImage.url,
    productId,
  });

  return addPhoto;
};

exports.updateTableProduct = async (req, category) => {
  const { name, qty, description } = req.body;
  const update = await RoomProduct.update(
    {
      name,
      qty,
      description,
      categoryId: category.id,
    },
    {
      where: {
        id: req.params.id,
      },
    }
  );
  console.log(update);
};

exports.deleteTableProduct = async (req) => {
  await RoomProduct.destroy({
    where: {
      id: req.params.id,
    },
  });
};
