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

module.exports = { getAll, getById, create };