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

const createSaleProduct = async (id, { productId, quantity }) => {
  await connection.execute(
    'INSERT INTO sales_products (sale_id, product_id, quantity) VALUE (?, ?, ?)',
    [id, productId, quantity],
  );

  const result = { id, productId, quantity };

  return result;
};

const updateSale = async (id, { productId, quantity }) => {
  await connection.execute(
    'UPDATE sales_products SET quantity = (?) WHERE sale_id = (?) AND product_id = (?)',
    [quantity, id, productId],
  );

  const result = { id, productId, quantity };

  return result;
};

const deleteSale = async (id) => {
  await connection.execute('DELETE FROM sales WHERE id = (?)', [id]);
};

const deleteProduct = async (id) => {
  await connection.execute('DELETE FROM sales_products WHERE sale_id = (?)', [id]);
};

const excludeSale = async (id) => {
  await deleteProduct(id);
  const response = await deleteSale(id);

  return response;
};

module.exports = {
  getSales,
  getSalesProducts,
  createSale,
  createSaleProduct,
  updateSale,
  excludeSale,
};