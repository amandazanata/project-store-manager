const connection = require('./connection');

const getSales = async () => { // backend 5.5
  const [result] = await connection.execute(
    `SELECT sales.id AS saleId, sales.date AS date,
    product.product_id AS productId,
    product.quantity AS quantity
    FROM StoreManager.sales AS sales
    JOIN StoreManager.sales_products AS product
    ON product.sale_id = sales.id;`,
  );
  return result;
};

const getSalesProducts = async (id) => {
  const [result] = await connection.execute(
    `SELECT sales.date AS date,
    product.product_id AS productId,
    product.quantity AS quantity
    FROM StoreManager.sales AS sales
    JOIN StoreManager.sales_products AS product
    ON product.sale_id = sales.id
    WHERE sales.id = ?;`, [id],
  );
  return result;
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

const updateSale = async (saleId, arraySales) => {
    const promise = await arraySales.map(async ({ quantity, productId }) => {
      await connection.execute(
        `UPDATE StoreManager.sales_products
      SET quantity = ?
      WHERE sale_id = ?
      AND product_id = ?;`,
        [quantity, saleId, productId],
      );
    });

    await Promise.all(promise);
  };

const excludeSale = async (id) => {
  await connection.execute('DELETE FROM sales WHERE id = (?)', [id]);
};

module.exports = {
  getSales,
  getSalesProducts,
  createSale,
  createSaleProduct,
  updateSale,
  excludeSale,
};