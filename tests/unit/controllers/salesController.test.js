const { expect } = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const chai = require("chai");

chai.use(sinonChai);

const salesService = require('../../../src/services/sales.service');
const salesController = require('../../../src/controllers/sales.controller');
const {
  saleToInsert,
  resultInsertSale,
  wrongSaleToInsert,
  oneSale,
  allSales,
} = require('./controllerMocks');

describe('Testes de controller de sales', function () {
  afterEach(() => sinon.restore());

  /* describe('Testes da função insert', function () {
    it('Cria uma sale corretamente com status correto', async function () {
      const req = {
        body: saleToInsert,
      };
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon
        .stub(salesService, 'create')
        .resolves({ type: null, message: resultInsertSale });

      await salesController.create(req, res);

      expect(res.status).to.have.been.calledWith(201);
      expect(res.json).to.have.been.calledWith(resultInsertSale);
    });

    it('Insere uma sale errada e retorna o erro', async function () {
      const req = {
        body: wrongSaleToInsert,
      };
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon
        .stub(salesService, 'create')
        .resolves({ type: 422, message: '"quantity" must be greater than or equal to 1' });

      await salesController.create(req, res);

      expect(res.status).to.have.been.calledWith(422);
      expect(res.json).to.have.been.calledWith({ message: '"quantity" must be greater than or equal to 1' });
    });
  }) */

  it('Retorna status 200 e a lista de produtos', async function () {
    const req = {};
    const res = {};

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    sinon
      .stub(salesService, 'getSales')
      .resolves({ type: null, message: allSales });
    await salesController.getSales(req, res);

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(allSales);
  });

  it('Retorna status 200 e produtos do id pesquisado', async function () {
    const req = {
      params: { id: 1 },
    };
    const res = {};

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    sinon
      .stub(salesService, 'getSalesProducts')
      .resolves({ type: null, message: oneSale });

    await salesController.getSalesProducts(req, res);

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(oneSale);
  });

  it('Retorna eero com um id que não existe', async function () {
    const req = {
      params: { id: 999 },
    };
    const res = {};

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    sinon
      .stub(salesService, 'getSalesProducts')
      .resolves({ type: 404, message: 'Sale not found' });

    await salesController.getSalesProducts(req, res);

    expect(res.status).to.have.been.calledWith(404);
    expect(res.json).to.have.been.calledWith({ message: 'Sale not found' });
  });

  it('erro update id', async function () {
    sinon.stub(salesService, 'updateSale').resolves({ type: 404, message: 'Sale not found' });

    const req = { params: { id: '9765' } };
    const res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);

    await salesController.updateSale(req, res);

    expect(res.status).to.have.been.calledWith(404);
    expect(res.json).to.have.been.calledWith({ message: 'Sale not found' });
  });

  it('deleta sale', async function () {
    sinon.stub(salesService, 'excludeSale').resolves({ type: null, message: undefined });

    const req = { params: { id: '1' } };
    const res = {};
    res.status = sinon.stub().returns(res);
    res.end = sinon.stub().returns();

    await salesController.excludeSale(req, res);

    expect(res.status).to.have.been.calledWith(204);
    expect(res.end).to.have.been.calledWith();
  });
});