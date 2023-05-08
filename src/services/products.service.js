const productsTable = require('../models/products.model');

const getAll = async () => {
  const productFound = await productsTable.getAll();
  return productFound;
};

const getById = async (id) => {
  const productFound = await productsTable.getById(id);
  if (!productFound) return { type: 'Product not found', message: 'Product not found' };
  return { type: null, message: productFound };
};

module.exports = { getAll, getById };