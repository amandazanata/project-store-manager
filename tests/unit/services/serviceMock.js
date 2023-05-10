const correctReturn = [
  { "id": 1, "name": "Martelo de Thor" },
  { "id": 2, "name": "Traje de encolhimento" }
]

const notFoundProduct = { "message": "Product not found" }

const correctIdProduct = { "id": 1, "name": "Martelo de Thor" }

const createReturn = { id: 4, name: 'Produto1' };

const invalidProduct = [{ productId: 9999, quantity: 1 }];

const correctObject = {
  id: 3,
  itemsSold: [
    { productId: 1, quantity: 1 },
    { productId: 2, quantity: 5 },
  ]
};

module.exports = {
  correctReturn,
  notFoundProduct,
  correctIdProduct,
  createReturn,
  invalidProduct,
  correctObject,
};