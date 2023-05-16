const salesFunctions = require('../models/sales.model');
const { validateProduct } = require('../middlewares/validations');
// id e date

// abstração com ajuda da Fani
/* const getSales = async (products) => {
  const getProductId = await productModel.getAll();
  const valid = getProductId.map((product) => product.id);

  const result = products.every((product) => valid.includes(product.productId));
  if (!result) return { type: 404, message: 'Product not found' };
  
  const valiDate = await salesFunctions.getSales();
  await Promise.all(products.map((product) => salesFunctions // 5.2 camada service gabarito
    .getSalesProducts(valiDate, product.productId, product.quantity)));
  
  return { id: valiDate, itemsSold: products };
}; */

const getSales = async () => {
  const result = await salesFunctions.getSales();

  return { type: null, message: result };
};

const getSalesProducts = async (id) => {
  const sale = await salesFunctions.getSalesProducts(id);
  if (!sale || sale.length === 0) {
    return { type: 404, message: 'Sale not found' };
  }
  return { type: null, message: sale };
};

const createSale = async (sales) => {
  const error = await validateProduct(sales);
  if (error.length > 0) {
    return { type: 404, message: 'Product not found' };
  }

  const saleId = await salesFunctions.createSale();

  await Promise.all(
    sales.map(async (sale) => salesFunctions.createSaleProduct(saleId, sale)),
  );

  const response = { id: saleId, itemsSold: sales };

  return { type: null, message: response };
};

const updateSale = async (saleId, itemsUpdated) => {
    const { type } = await getSalesProducts(saleId);
    await salesFunctions.updateSale(saleId, itemsUpdated);
    if (type) {
      return { type: 404, message: 'Sale not found' };
    }
    return { type: null, message: { saleId, itemsUpdated } };
  };

const excludeSale = async (id) => {
  const sale = await salesFunctions.getSalesProducts(id);
  if (sale.length === 0) return { type: 404, message: 'Sale not found' };
  
  await salesFunctions.excludeSale(id);

  return { type: null, message: sale };
};

module.exports = { getSales, getSalesProducts, createSale, updateSale, excludeSale };