const { salesFunctions } = require('../models/sales.model');
// id e date

const getSales = async (productId) => {
  const product = await salesFunctions.sales(productId);
  if (!product) return { message: '"productId" is required' };
  return { message: product };
};

module.exports = { getSales /* getSalesProducts */ };