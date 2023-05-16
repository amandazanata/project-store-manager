const correctReturn = [
  { "id": 1, "name": "Martelo de Thor" },
  { "id": 2, "name": "Traje de encolhimento" }
]

const notFoundProduct = { "message": "Product not found" }

const correctIdProduct = { "id": 1, "name": "Martelo de Thor" }

const getObject = [
  {
    "saleId": 1,
    "date": "2021-09-09T04:54:29.000Z",
    "productId": 1,
    "quantity": 2
  },
  {
    "saleId": 2,
    "date": "2021-09-09T04:54:54.000Z",
    "productId": 2,
    "quantity": 2
  }
];
const saleSucceed = {
  id: 1,
  date: '2023-04-27 20:44:50',
};

const getSales = {
  sales: [
    { saleId: 1, date: '2021-09-09T04:54:29.000Z' },
    { saleId: 2, date: '2021-09-09T04:54:54.000Z' },
  ],
  salesProducts: [
    { saleId: 1, productId: 1, quantity: 2 },
    { saleId: 2, productId: 2, quantity: 2 },
  ],
};

const createList = [
  {
    "productId": 1,
    "quantity": 1
  },
  {
    "productId": 2,
    "quantity": 5
  }
];

const savedSale = {
  "id": 3,
  "itemsSold": [
    {
      "productId": 1,
      "quantity": 1
    },
    {
      "productId": 2,
      "quantity": 5
    }
  ]
};

const productModelMock = [
  {
    "id": 1,
    "name": "Martelo de Thor"
  },
  {
    "id": 2,
    "name": "Traje de encolhimento"
  },
  {
    "id": 3,
    "name": "Escudo do Capitão América"
  }
]

const productSearchByName = [
  {
    "id": 1,
    "name": "Martelo de Thor"
  }
]

module.exports = {
  correctReturn,
  notFoundProduct,
  correctIdProduct,
  getObject,
  createList,
  savedSale,
  getSales,
  saleSucceed,
  productModelMock,
  productSearchByName,
};