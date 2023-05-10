const nameValidation = (req, res, next) => {
  const { name } = req.body;

  if (!name) return res.status(400).json({ message: '"name" is required' });

  if (name.length < 5) {
    return res.status(422).json({ message: '"name" length must be at least 5 characters long' });
  }

  return next();
};

const correctInput = (req, res, next) => {
  const sale = req.body;
  const validProductId = sale.every((product) => product.productId);

  if (!validProductId) {
    return res.status(400).json({ message: '"productId" is required' });
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

module.exports = { nameValidation, correctInput, correctQuantity };