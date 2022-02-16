const { ProductCategory } = require('../models');

exports.getAllProductCategories = async () => {
  const categories = await ProductCategory.findAll({});
  return categories;
};

exports.getProductCategories = async (req, res) => {
  const categories = await ProductCategory.findOne({
    where: {
      id: req.params.id,
    },
  });
  return categories;
};

exports.addProductCategories = async (req, res) => {
  const { name, description } = req.body;
  const newCategories = await ProductCategory.create({
    name,
    description,
  });

  return newCategories;
};

exports.updateProductCategories = async (req, res) => {
  const { name, description } = req.body;

  await ProductCategory.update(
    {
      name,
      description,
    },
    {
      where: {
        id: req.params.id,
      },
    }
  );
};

exports.deleteProductCategories = async (req, res) => {
  await ProductCategory.destroy({
    where: {
      id: req.params.id,
    },
  });
};
