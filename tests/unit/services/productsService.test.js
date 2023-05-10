const { expect } = require('chai');
const sinon = require('sinon');

const salesService = require('../../../src/services/sales.service');
const productsModel = require('../../../src/models/products.model');
const productsService = require('../../../src/services/products.service');
const { correctReturn,
  notFoundProduct,
  correctIdProduct,
  createReturn,
  invalidProduct,
  correctObject,
} = require('../services/serviceMock');

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
  
  it('Create /product', async function () {
  
    sinon.stub(productsModel, 'create').resolves(createReturn);
  
    const result = await productsService.create({
      "name": "ProdutoX"
    });
  
    expect(result).to.be.an('object');
    expect(result.message).to.be.equal(createReturn);
  });

  it('erro', async function () {
    sinon.stub(productsModel, 'getAll').resolves(correctReturn);

    const result = await salesService.getSales(invalidProduct);

    expect(result.type).to.equal(404);
    expect(result.message).to.equal('Product not found');
  });

  it('Success create', async function () {
    sinon.stub(productsModel, 'getAll').resolves(correctReturn);
    sinon.stub(salesService, 'getSales').resolves(2);

    const result = await salesService.getSales([
      { productId: 1, quantity: 1 },
      { productId: 2, quantity: 5 },
    ]);

    expect(result).to.deep.equal(correctObject);
  });
});