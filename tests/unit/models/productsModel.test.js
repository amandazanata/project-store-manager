const { expect } = require('chai');
const sinon = require('sinon');

const productsModel = require('../../../src/models/products.model');
const connection = require('../../../src/models/connection');
const { correctReturn, notFoundProduct, correctIdProduct } = require('./modelMock');

describe('Testes de unidade do model dos produtos', function () {
  afterEach(() => sinon.restore());

  it('Verifica retorno do array de produtos', async function () {

    sinon.stub(connection, 'execute').resolves([correctReturn]);

    const result = await productsModel.getAll();

    expect(result).to.be.deep.an('array');
    expect(result[0]).to.contain.keys(['id', 'name']);
    expect(result).to.be.deep.equal(correctReturn);
  });

  it('Verifica retorno de produtos via /products/:id', async function () {
  
    sinon.stub(connection, 'execute').resolves([correctReturn]);

    const result = await productsModel.getById(0);

    expect(result).to.be.deep.an('object');
    expect(result).to.be.deep.equal(correctReturn[0]);
  });
});