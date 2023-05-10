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

const create = async ({ product }) => {
  const [{ insertId }] = await connection.execute(
    'INSERT INTO products (name) VALUES (?);',
    [product],
  );

  return { id: insertId, name: product };
};

const exclude = async (productId) => { // backend 5.5
  const deleteQuery = 'DELETE FROM products WHERE id = (?);';
  const [{ deleteBd }] = await connection.execute(deleteQuery, [productId]);

  console.log('deleta', deleteBd);
  return deleteBd;
};

module.exports = { getAll, getById, create, exclude };

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