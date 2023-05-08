const { expect } = require('chai');
const sinon = require('sinon');

const productsModel = require('../../../src/models/products.model');
const productsService = require('../../../src/services/products.service');
const { correctReturn, notFoundProduct, correctIdProduct } = require('../services/serviceMock');

describe('Testes de unidade do service dos produtos', function () {
  afterEach(() => sinon.restore());

  it('Retorno correto /products', async function () {

    sinon.stub(productsModel, 'getAll').resolves(correctReturn);

    const result = await productsService.getAll();

    expect(result).to.be.deep.an('array');
    expect(result).to.be.deep.equal(correctReturn);
  });

  it('Retorno correto via /products/:id', async function () {

    sinon.stub(productsModel, 'getById').resolves(correctReturn[0]);

    const result = await productsService.getById(1);

    expect(result).to.be.an('object');
    expect(result.message).to.be.equal(correctReturn[0]);
    expect(result.type).to.be.equal(null);
  });

  it('Retorno de erro via products/:id', async function () {

    sinon.stub(productsModel, 'getById').resolves();

    const result = await productsService.getById('abcde');

    expect(result.message).to.be.deep.equal('Product not found');
    expect(result.type).to.be.deep.equal('Product not found');
  });
});