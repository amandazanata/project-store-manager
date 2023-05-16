const { expect } = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const chai = require("chai");

chai.use(sinonChai);

const productModel = require('../../../src/models/products.model');
const connection = require('../../../src/models/connection');
const { correctReturn, productModelMock } = require('./modelMock');

describe('Testes de unidade do model dos produtos', function () {
  afterEach(() => sinon.restore());

  it('lista de produtos', async function () {
    sinon.stub(connection, 'execute').resolves([productModelMock]);
    const result = await productModel.getAll();
    expect(result).to.be.deep.equal(productModelMock);
  });

  it('produto por id', async function () {
    sinon.stub(connection, 'execute').resolves([[productModelMock]]);
    const result = await productModel.getById(1);
    expect(result).to.be.deep.equal(productModelMock);
  });

/*   it('retorno de id', async function () {
    sinon.stub(connection, 'execute').resolves([{ insertId: 42 }]);
    const result = await productModel.create('Novo Produto');
    expect(result).to.be.deep.equal({ id: 42, name: "Novo Produto" });
  }); */

/*   it('retorna produto com mesmo id', async function () {
    sinon.stub(connection, 'execute')
      .resolves([productModelMock]).onCall(1)
      .resolves().onCall(2);
    const result = await productModel.update(1, 'Novo Produto Atualizado');
    expect(result).to.be.deep.equal({ id: 1, name: "Novo Produto Atualizado" });
  }) */;

/*   it('delete com id', async function () {
    sinon.stub(connection, 'execute')
      .resolves([{ changedRows: 1 }]);
    const result = await productModel.exclude(1);
    expect(result).to.be.deep.equal(1);
  }); */
});