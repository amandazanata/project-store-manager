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

/* const productByName = async (name) => {
  const result = await productModel.productByName(name);
  if (!result) return { type: 404, message: 'Product not found' };
  return { type: null, message: result };
}; */

const create = async (product) => { // ajuda do Ronald via slack
  const newProduct = await productsTable.create({ product });

  if (newProduct.type) return newProduct;

  return { type: null, message: newProduct };
};

const update = async (name, id) => {
  const service = await productsTable.update(name, id);
  
  const getProductId = await productsTable.getById(id);

  if (service.affectedRows === 0 && !getProductId) {
    return { type: 404, message: 'Product not found' };
  }

  return { type: null, message: { id, name } };
};

const exclude = async (id) => { // backend 5.5
  const getProductId = await productsTable.getById(id);
  if (getProductId === undefined) return { type: 'erro', statusCode: 404 };

  await productsTable.exclude(id);

  return { type: null, statusCode: 204 };
};

module.exports = { getAll, getById, create, exclude, update };