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

const create = async (product) => {
  const newProduct = await productsTable.create({ product });

  if (newProduct.type) return newProduct;

  return { type: null, message: newProduct };
};

const exclude = async (id) => {
  const getProductId = await productsTable.getById(id);
  if (getProductId === undefined) return { type: 'erro', statusCode: 404 };
  await productsTable.exclude(id);

  return { type: null, statusCode: 204 };
};

module.exports = { getAll, getById, create, exclude };