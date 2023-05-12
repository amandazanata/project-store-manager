const connection = require('./connection');

const getSales = async () => { // backend 5.5
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

const createSale = async () => {
  const [{ insertId }] = await connection.execute(
    'INSERT INTO sales () value ()',
  );
  return insertId;
};

module.exports = { getSales, getSalesProducts, createSale };