const connection = require('./connection');

const getAll = async () => {
  const [products] = await connection.execute(
    'SELECT * FROM products;',
  );
  console.log(products);
  return products;
};

const getById = async (id) => {
  const [[products]] = await connection.execute(
    'SELECT * FROM products WHERE id = (?);',
    [id],
  );

  return products;
};

const create = async ({ product }) => { // ajuda do Ronald via slack
  const [{ insertId }] = await connection.execute(
    'INSERT INTO products (name) VALUES (?);',
    [product],
  );

  return { id: insertId, name: product };
};

const update = async (name, id) => {
  const [affectedRows] = await connection
  .execute('UPDATE products SET name = (?) WHERE id = (?);', [name, id]);
  /* console.log('parametros', affectedRows); */
  
  return affectedRows;
};

const exclude = async (productId) => { // backend 5.5
  const response = await connection
    .execute('DELETE FROM products WHERE id = (?);', [productId]);
  
  return response;
};

module.exports = { getAll, getById, create, exclude, update };

// requisito 6
/* const expected = [
  {
    "productId": 1,
    "quantity": 1
  },
  {
    "productId": 2,
    "quantity": 5
  }
] */