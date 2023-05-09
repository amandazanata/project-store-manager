const nameValidation = (req, res, next) => {
  const { name } = req.body;

  if (!name) return res.status(400).json({ message: '"name" is required' });

  if (name.length < 5) {
    return res.status(422).json({ message: '"name" length must be at least 5 characters long' });
  }

  return next();
};

const correctInput = async (sale) => {
  const invalidProductId = sale.map(({ productId }) => {
    if (!productId) return 'noProduct';
    return '';
  });

  const validId = invalidProductId.some((product) => product === 'noProduct');
  if (validId) return { type: 400, message: '"product" is required' };
};

const correctQuantity = async (sale) => {
  const invalidQuantity = sale.map(({ quantity }) => {
    if (!quantity) return 'noQuantity';
    return '';
  });

  const validQuantity = invalidQuantity.some((product) => product === 'noQuantity');
  if (validQuantity) return { type: 400, message: '"quantity" is required' };
};

module.exports = { nameValidation, correctInput, correctQuantity };