const { expect } = require('chai');
const sinon = require('sinon');

const salesModel = require('../../../src/models/sales.model');
const connection = require('../../../src/models/connection');
const { getObject, createList, saleSucceed } = require('./modelMock');

describe('Teste unitário para o Sale Model', function () {
  afterEach(() => sinon.restore());

  it('Retorna o objeto referente à venda', async function () {
    sinon.stub(connection, 'execute').resolves([[saleSucceed]]);
    const sale = await salesModel.getSalesProducts(1);
    expect(sale).to.be.deep.equal(saleSucceed);
  });

  it('Sucesso!', async function () {
    sinon.stub(connection, 'execute').resolves([{ insertId: 3 }]);

    await salesModel.create(createList);
  });
});