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

const updatedProduct = {
  "id": 1,
  "name": "Laço da mulher maravilha"
};

const sales = [
  { id: 1, date: '2022-11-11 21:00:58' },
  { id: 1, date: '2022-11-12 19:13:50' },
];

const salesProducts = [
  [
    {
      "sales_id": 1,
      "product_id": 1,
      "quantity": 5,
    },
    {
      "sales_id": 1,
      "product_id": 2,
      "quantity": 10,
    },
    {
      "sales_id": 2,
      "product_id": 3,
      "quantity": 15,
    },
  ]
];

const salesProductsById1 = [
  {
    "date": '2022-11-11 21:00:58',
    "product_id": 1,
    "quantity": 5,
  },
  {
    "date": '2022-11-11 21:00:58',
    "product_id": 2,
    "quantity": 10,
  },
];

const salesProductsResult = [
  {
    "date": '2022-11-11 21:00:58',
    "productId": 1,
    "quantity": 5,
  },
  {
    "date": '2022-11-11 21:00:58',
    "productId": 2,
    "quantity": 10,
  },
];

module.exports = {
  correctReturn,
  notFoundProduct,
  correctIdProduct,
  createReturn,
  invalidProduct,
  correctObject,
  updatedProduct,
  sales,
  salesProducts,
  salesProductsById1,
  salesProductsResult,
};