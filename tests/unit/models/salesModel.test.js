const { expect } = require('chai');
const sinon = require('sinon');

const salesModel = require('../../../src/models/sales.model');
const connection = require('../../../src/models/connection');
const {
  sales,
  salesProductsById1,
  salesProductsResult,
} = require('./modelMock');

describe('Teste unitário para o Sale Model', function () {
  afterEach(() => sinon.restore());
  it('Recupera a lista de vendas', async function () {
    sinon.stub(connection, 'execute').resolves([sales]);
    const result = await salesModel.getSales();
    expect(result).to.be.deep.equal(sales);
  });

/*   it('Recupera produtos pelo Id da venda', async function () {
    sinon.stub(connection, 'execute').resolves([salesProductsById1]);
    const result = await salesModel.getSalesProducts(1);
    expect(result).to.be.deep.equal(salesProductsResult);
  });
 */
  it('Registra uma venda e retorna o ID', async function () {
    sinon.stub(connection, 'execute').resolves([{ insertId: 42 }]);
    const result = await salesModel.createSale();
    expect(result).to.be.deep.equal(42);
  });

  it('Registra um produto em uma venda', async function () {
    sinon.stub(connection, 'execute').resolves([{ insertId: 42 }]);
    const { productId, quantity } = salesProductsResult[0];
    const result = await salesModel.createSaleProduct(18, { productId, quantity });
    expect(result).to.be.deep.equal({ id: 18, productId, quantity });
  });

/*   it('Atualiza produtos de uma venda', async function () {
    sinon.stub(connection, 'execute').resolves();
    const { productId } = salesProductsResult[0];
    const result = await salesModel.updateSale(18, { productId, quantity: 90 });
    expect(result).to.be.deep.equal({ id: 18, productId, quantity: 90 });
  }); */
});