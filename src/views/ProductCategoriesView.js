const { getTimestamp } = require('../services/GlobalServices');

class ProductCategoriesView {
  constructor({ id, name, description, createdAt, updatedAt }) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  toJSON() {
    return {
      id: this.id,
      name: this.name,
      description: this.description,
      createdAt: getTimestamp(this.createdAt),
      updatedAt: getTimestamp(this.updatedAt),
    };
  }
}

module.exports = ProductCategoriesView;
