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

const create = async (req, res) => {
  const product = req.body;
  const result = await productsTable.create(product);

  if (result.type) return res.status(result.type).json(result.message);
  return res.status(201).json(result.message);
};

module.exports = { getAll, getById, create };