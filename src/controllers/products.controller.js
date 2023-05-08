const productsTable = require('../services/products.service');

const getAll = async (req, res) => {
  const product = await productsTable.getAll();
  return res.status(200).json(product);
};

const getById = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await productsTable.getById(id);

  if (type) return res.status(404).json({ message: 'Product not found' });

  return res.status(200).json(message);
};

module.exports = { getAll, getById };