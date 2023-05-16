const correctReturn = [
  { "id": 1, "name": "Martelo de Thor" },
  { "id": 2, "name": "Traje de encolhimento" },
  { "id": 3, "name": 'Escudo do Capitão América' },
]

const productFound = { id: 4, name: 'Produto1' };

const resolved = {
  id: 3,
  itemsSold: [
    { productId: 1, quantity: 1 },
    { productId: 2, quantity: 5 },
  ]
}

const update = [
  {
    productId: 1,
    quantity: 1
  },
  {
    productId: 2,
    quantity: 5
  }
];

const wrongSaleToInsert = [
  {
    "productId": 1,
    "quantity": -1
  },
  {
    "productId": 2,
    "quantity": 5
  }
];

const saleToInsert = [
  {
    "productId": 1,
    "quantity": 1
  },
  {
    "productId": 2,
    "quantity": 5
  }
];

const resultInsertSale = {
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

const allSales = [
  {
    "saleId": 1,
    "date": "2023-04-28T22:57:15.000Z",
    "productId": 1,
    "quantity": 5
  },
  {
    "saleId": 1,
    "date": "2023-04-28T22:57:15.000Z",
    "productId": 2,
    "quantity": 10
  },
  {
    "saleId": 2,
    "date": "2023-04-28T22:57:15.000Z",
    "productId": 3,
    "quantity": 15
  }
];

const oneSale = [
  {
    "date": "2023-04-28T22:57:15.000Z",
    "productId": 1,
    "quantity": 5
  },
  {
    "date": "2023-04-28T22:57:15.000Z",
    "productId": 2,
    "quantity": 10
  }
];

const resultOfUpdate = {
  saleId: 1,
  itemsUpdated: [
    {
      productId: 1,
      quantity: 1
    },
    {
      productId: 2,
      quantity: 5
    }
  ]
};

const updatedProduct = {
  "id": 1,
  "name": "Laço da mulher maravilha"
};

const newProduct = {
  "id": 7,
  "name": "Laço da mulher maravilha"
};

module.exports = {
  correctReturn,
  productFound,
  resolved,
  saleToInsert,
  newProduct,
  resultInsertSale,
  wrongSaleToInsert,
  oneSale,
  allSales,
  updatedProduct,
};