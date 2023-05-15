const salesFunctions = require('../services/sales.service');
//  sale_id, product_id e quantity;

const getSales = async (req, res) => { // backend 5.5
  const result = await salesFunctions.getSales(req.body);
  if (result.type) return res.status(result.type).json({ message: result.message });

  return res.status(201).json(result);
};

const getSalesProducts = async (req, res) => {
  const result = await salesFunctions.getSalesProducts();

  return res.status(200).json(result);
};

const updateSale = async (req, res) => {
  const products = req.body;
  const { id } = req.params;

  const { type, message } = await salesFunctions.updateSale(id, products);

  if (type) return res.status(type).json({ message });

  res.status(200).json(message);
};

const excludeSale = async (req, res) => {
  const { id } = req.params;

  const { type, message } = await salesFunctions.excludeSale(id);

  if (type) return res.status(type).json({ message });

  res.status(204).end();
};

module.exports = { getSales, getSalesProducts, updateSale, excludeSale };