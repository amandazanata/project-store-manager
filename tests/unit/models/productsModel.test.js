const { expect } = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const chai = require("chai");

chai.use(sinonChai);

const productsModel = require('../../../src/models/products.model');
const connection = require('../../../src/models/connection');
const { correctReturn, productModelMock } = require('./model.mock');

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

  it('retorna produto com mesmo id', async function () {
    sinon.stub(connection, 'execute')
      .resolves([productModelMock]).onCall(1)
      .resolves().onCall(2);
    const result = await productsModel.update(1, 'Novo Produto Atualizado');
    expect(result).to.be.deep.equal({ id: 1, name: "Novo Produto Atualizado" });
  });

  it('delete com id', async function () {
    sinon.stub(connection, 'execute')
      .resolves([{ changedRows: 1 }]);
    const result = await productsModel.excludeProduct(1);
    expect(result).to.be.deep.equal(1);
  });
});