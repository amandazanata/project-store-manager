const salesFunctions = require('../services/sales.service');
//  sale_id, product_id e quantity;

const getSales = async (req, res) => {
  const result = await salesFunctions.getSales(req.body);
  if (result.type) return res.status(result.type).json({ message: result.message });

  return res.status(201).json(result);
};

const getSalesProducts = async (req, res) => {
  const result = await salesFunctions.getSalesProducts();

  return res.status(200).json(result);
};

module.exports = { getSales, getSalesProducts };