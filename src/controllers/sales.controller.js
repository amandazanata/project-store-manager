const salesFunctions = require('../services/sales.service');
//  sale_id, product_id e quantity;

const getSales = async (_req, res) => { // backend 5.5
  const { message } = await salesFunctions.getSales();
  return res.status(200).json(message);
};

const getSalesProducts = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await salesFunctions.getSalesProducts(id);
  if (type) {
    return res.status(type).json({ message: 'Sale not found' });
  }
  return res.status(200).json(message);
};

const createSale = async (req, res) => {
  const sales = req.body;

  const { type, message } = await salesFunctions.createSale(sales);
  if (type) return res.status(type).json({ message });

  res.status(201).json(message);
};

const updateSale = async (req, res) => {
  const { id } = req.params;
  const arraySales = req.body;

  const { type, message } = await salesFunctions.updateSale(id, arraySales);
  if (type) {
    return res.status(404).json({ message });
  }
  return res.status(200).json(message);
};

const excludeSale = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await salesFunctions.excludeSale(id);

  if (type) return res.status(type).json({ message });

  return res.status(204).end();
};

module.exports = { getSales, getSalesProducts, createSale, updateSale, excludeSale };