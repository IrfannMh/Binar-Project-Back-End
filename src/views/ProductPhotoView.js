const { getTimestamp } = require('../services/GlobalServices');

class ProductPhotoView {
  constructor({ id, title, alt, url, productId, updatedAt, createdAt }) {
    this.id = id;
    this.title = title;
    this.alt = alt;
    this.url = url;
    this.productId = productId;
    this.updatedAt = updatedAt;
    this.createdAt = createdAt;
  }

  toJSON() {
    return {
      id: this.id,
      title: this.title,
      alt: this.alt,
      url: this.url,
      createdAt: getTimestamp(this.createdAt),
      updatedAt: getTimestamp(this.updatedAt),
    };
  }
}

module.exports = ProductPhotoView;
