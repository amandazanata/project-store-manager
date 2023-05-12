const salesFunctions = require('../models/sales.model');
const productModel = require('../models/products.model');
// id e date

// abstração com ajuda da Fani
const getSales = async (products) => {
  const getProductId = await productModel.getAll();

  const valid = getProductId.map((product) => product.id);
  const result = products.every((product) => valid.includes(product.productId));
  if (!result) return { type: 404, message: 'Product not found' };
  
  const valiDate = await salesFunctions.getSales();
  await Promise.all(products.map((product) => salesFunctions // 5.2 camada service gabarito
    .getSalesProducts(valiDate, product.productId, product.quantity)));
  
  return { id: valiDate, itemsSold: products };
};

module.exports = { getSales };