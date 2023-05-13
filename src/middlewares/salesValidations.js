const productService = require('../services/products.service');

const productValidate = async (req, res, next) => {
  const sales = req.body;

  const validId = sales.some(({ productId }) => !productId);
  if (validId) {
    return res.status(400).json({ message: '"productId" is required' });
  }

  const productExists = sales.map(async ({ productId }) => {
    const { type } = await productService.getById(productId);
    return !type;
  });

  const result = await Promise.all(productExists);
  if (result.includes(false)) {
    return res.status(404).json({ message: 'Product not found' });
  }

  return next();
};

/* const validationQuantity = async (req, res, next) => {
  const salesArray = req.body;

  const hasQuantity = salesArray.some(({ quantity }) => quantity === undefined);

  if (hasQuantity) {
    return res.status(400).json({ message: '"quantity" is required' });
  }

  const valQuantity = salesArray.some(({ quantity }) => quantity < 1);

  if (valQuantity) {
    return res
      .status(422)
      .json({ message: '"quantity" must be greater than or equal to 1' });
  }
  next();
}; */

module.exports = { productValidate };