const { expect } = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const chai = require("chai");

chai.use(sinonChai);

const productsModel = require('../../../src/models/products.model');
const connection = require('../../../src/models/connection');
const { correctReturn } = require('./modelMock');

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

  /* it('cadastrar produto na tabela sales', async function () {

    sinon.stub(connection, 'execute').resolves([{ insertId: 10 }]);

    const result = await productsModel.create();

    expect(result).to.equal(10);
  });

  it('cadastrar produto na tabela sales_products', async function () {

    sinon.stub(connection, 'execute').resolves();

    const result = await productsModel.getSalesProducts();

    expect(result).to.equal();
  });

  it('Insere um produto corretamente e retorna o id', async function () {
    sinon.stub(connection, 'execute').resolves([{ insertId: 7 }]);
    const productId = await productsModel.create('Laço da mulher maravilha');
    expect(productId).to.be.equal(7);
  }); */
});