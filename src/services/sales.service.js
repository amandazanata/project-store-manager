const salesFunctions = require('../models/sales.model');
const productModel = require('../models/products.model');
const { correctInput } = require('../middlewares/validations');
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

const updateSale = async (idString, products) => {
  const id = Number(idString);

  const error = await correctInput(products);
  if (error.length > 0) {
    return { type: 404, message: 'Product not found' };
  }

  const saleById = await salesFunctions.getSalesProducts(id);
  if (saleById.type) return { type: 404, message: 'Sale not found' };

  await Promise.all(products
    .map(async (sale) => salesFunctions.updateSale(id, sale)));
  const response = { saleId: id, itemsUpdated: products };

  return { type: null, message: response };
};

const excludeSale = async (idString) => {
  const id = Number(idString);

  const { type } = await salesFunctions.getSalesProducts(id);
  if (type) return { type: 404, message: 'Sale not found' };

  const result = await salesFunctions.excludeSale(id);

  return { type: null, message: result };
};

module.exports = { getSales, updateSale, excludeSale };