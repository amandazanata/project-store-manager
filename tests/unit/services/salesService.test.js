const { expect } = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const chai = require("chai");

chai.use(sinonChai);

const productModel = require('../../../src/models/products.model');
const salesModel = require('../../../src/models/sales.model');
const salesService = require('../../../src/services/sales.service');

const { sales, salesProductsResult } = require('./serviceMock');

describe('teste sales', function () {
  afterEach(() => sinon.restore());

  it('lista das vendas', async function () {
    sinon.stub(salesModel, 'getSales').resolves(sales);
    const response = { type: null, message: sales }
    const result = await salesService.getSales();
    expect(result).to.be.deep.equal(response);
  });

  it('recuperar id', async function () {
    sinon.stub(salesModel, 'getSalesProducts').resolves(salesProductsResult);
    const response = { type: null, message: salesProductsResult }
    const result = await salesService.getSalesProducts(1);
    expect(result).to.be.deep.equal(response);
  });

  it('recupera erro de id', async function () {
    sinon.stub(productModel, 'getById').resolves(undefined);
    const response = { type: 404, message: 'Product not found' };
    const result = await salesService.createSale(sales);
    expect(result).to.be.deep.equal(response);
  });

  it('nova venda.', async function () {
    sinon.stub(productModel, 'getById').resolves(true);
    sinon.stub(salesModel, 'createSale').resolves(88);
    const response = { type: null, message: { id: 88, itemsSold: sales } };
    const result = await salesService.createSale(sales);
    expect(result).to.be.deep.equal(response);
  });

  it('erro id inexistente', async function () {
    sinon.stub(productModel, 'getById').resolves(undefined);
    const response = { type: 404, message: 'Product not found' };
    const result = await salesService.updateSale('3', sales);
    expect(result).to.be.deep.equal(response);
  });

  it('atualiza com id inexistente', async function () {
    sinon.stub(productModel, 'getById').resolves(true);
    sinon.stub(salesModel, 'getSalesProducts').resolves([]);
    const response = { type: 404, message: 'Sale not found' };
    const result = await salesService.updateSale('9999', sales);
    expect(result).to.be.deep.equal(response);
  });

  it('atualiza venda', async function () {
    sinon.stub(productModel, 'getById').resolves(true);
    sinon.stub(salesModel, 'getSalesProducts').resolves([true]);
    sinon.stub(salesModel, 'updateSale').resolves({ id: 18, productId: 8, quantity: 90 });
    const response = { type: null, message: { saleId: 3, itemsUpdated: sales } };
    const result = await salesService.updateSale('3', sales);
    expect(result).to.be.deep.equal(response);
  });

  it('deleta venda', async function () {
    sinon.stub(salesModel, 'getSalesProducts').resolves([true]);
    sinon.stub(salesModel, 'excludeSale').resolves();
    const response = { type: null, message: undefined };
    const result = await salesService.excludeSale('3');
    expect(result).to.be.deep.equal(response);
  });

  it('venda de id errado', async function () {
    sinon.stub(salesModel, 'getSalesProducts').resolves([]);
    sinon.stub(salesModel, 'excludeSale').resolves();
    const response = { type: 404, message: 'Sale not found' };
    const result = await salesService.excludeSale('4894523');
    expect(result).to.be.deep.equal(response);
  });
});