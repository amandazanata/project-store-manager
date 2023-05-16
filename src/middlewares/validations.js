const productModel = require('../models/products.model');

const nameValidation = (req, res, next) => {
  const { name } = req.body;

  if (!name) return res.status(400).json({ message: '"name" is required' });

  if (name.length < 5) {
    return res.status(422).json({ message: '"name" length must be at least 5 characters long' });
  }

  return next();
};

const correctQuantity = (req, res, next) => {
  const salesProducts = req.body;

  const validQuantity = salesProducts.every((sale) => Object.keys(sale).includes('quantity'));
  if (!validQuantity) {
    return res.status(400).json({ message: '"quantity" is required' });
  }

  const quantityValue = salesProducts.every((product) => product.quantity > 0);
  if (!quantityValue) {
    return res.status(422).json({ message: '"quantity" must be greater than or equal to 1' });
  }

  return next();
};

const correctInput = (req, res, next) => {
  const sales = req.body;
  const validProductId = sales
    .some((product) => product === undefined || product === 0);

  if (validProductId) {
    return res.status(400).json({ message: '"productId" is required' });
  }
  return next();
};

const validateProductFirst = (req, res, next) => {
  const sales = req.body;
  const erroJorge = [];

  sales.forEach(({ productId, quantity }) => {
    const { error } = productModel.getById(productId, quantity);

    if (error) {
      erroJorge.push(error);
    }
  });
  if (erroJorge.length > 0) {
    return res.status(422).json({ message: erroJorge[0].message });
  }

  return next();
};

const validateProduct = async (sales) => {
  const error = [];

  await Promise.all(sales.map(async ({ productId }) => {
    const product = await productModel.getById(productId);

    if (product === undefined) {
      error.push('erro');
    }
  }));

  return error;
};

module.exports = {
  nameValidation,
  correctInput,
  correctQuantity,
  validateProductFirst,
  validateProduct,
};