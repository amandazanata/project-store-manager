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
    'SELECT * FROM products WHERE id = ?;',
    [id],
  );

  return products;
};

const create = async ({ product }) => {
  const [{ insertProduct }] = await connection.execute(
    'INSERT INTO products (name) VALUES (?);',
    [product],
  );

  return { id: insertProduct, ...product };
};

module.exports = { getAll, getById, create };