const asyncWrapper = require('../plugins/asyncWrapper');
const {
  getAllProductCategories,
  getProductCategories,
  addProductCategories,
  updateProductCategories,
  deleteProductCategories,
} = require('../services/ProductCategoriesServices');
const ProductCategoriesView = require('../views/ProductCategoriesView');

exports.handleGetAllProductCategories = asyncWrapper(async (req, res) => {
  const categories = await getAllProductCategories();

  return res.ok(200, categories);
});

exports.handleGetProductCategories = asyncWrapper(async (req, res) => {
  const categories = await getProductCategories(req, res);

  if (!categories) {
    return res.fail(404, {
      name: 'Not Found',
      message: 'Categories doesn"t exist',
    });
  }
  const response = new ProductCategoriesView(categories);
  return res.ok(200, response);
});

exports.handlePostProductCategories = asyncWrapper(async (req, res) => {
  const categories = await addProductCategories(req, res);

  return res.ok(200, categories);
});

exports.handleUpdateProductCategories = asyncWrapper(async (req, res) => {
  const categories = await getProductCategories(req, res);
  if (!categories) {
    return res.fail(404, {
      name: 'Not Found',
      message: 'Categories doesn"t exist',
    });
  }

  await updateProductCategories(req, res);
  const update = new ProductCategoriesView(
    await getProductCategories(req, res)
  );
  return res.ok(200, update);
});

exports.handleDeleteProductCategories = asyncWrapper(async (req, res) => {
  const categories = await getProductCategories(req, res);
  if (!categories) {
    return res.fail(404, {
      name: 'Not Found',
      message: 'Categories not exist',
    });
  }
  await deleteProductCategories(req, res);
  return res.ok(200, {});
});
