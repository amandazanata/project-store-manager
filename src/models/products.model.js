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

const exclude = async (productId) => connection
  .execute('DELETE FROM products WHERE id = (?);', [productId]);

  // return true;
module.exports = { getAll, getById, create, exclude };