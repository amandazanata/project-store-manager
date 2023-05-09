const connection = require('./connection');

const getSales = async () => {
  const [{ insertId }] = await connection.execute(
    'INSERT INTO sales (date) VALUES (NOW());',
  );
  return insertId;
};

const getSalesProducts = async (saleId, idProduct, quantityId) => {
  await connection.execute(
    'INSERT INTO sales_products (sale_id, product_id, quantity) VALUES (?, ?, ?);',
    [saleId, idProduct, quantityId],
  );
};

  module.exports = { getSales, getSalesProducts };