const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

chai.use(sinonChai);

const { expect } = chai;

const productsService = require('../../../src/services/products.service');
const productsController = require('../../../src/controllers/products.controller');
const { correctReturn, productFound, correctIdProduct } = require('../controllers/controllerMocks');

describe('Testes de unidade do controller dos produtos', () => {
  afterEach(() => sinon.restore());

  it('Deve retornar o status 200 e os produtos listados', async () => {

    const res = {};
    const req = {};

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    sinon
      .stub(productsService, 'getAll')
      .resolves(correctReturn);

    await productsController.getAll(req, res);

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(correctReturn);
  });
});

describe('Testes de unidade do controller dos produtos com id', () => {
  afterEach(() => sinon.restore());

  it('Retorno de produto com id', async () => {
    const req = { params: { id: 2 } };
    const res = {};

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    sinon
      .stub(productsService, 'getById')
      .resolves({
        type: null, message: { "id": 2, "name": "Traje de encolhimento" }
      });

    await productsController.getById(req, res);

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith({
      "id": 2,
      "name": "Traje de encolhimento"
    });
  });
});

describe('Testes de unidade do controller dos produtos com id incorreta', () => {
  afterEach(() => sinon.restore());

  it('Retorna um erro ao não encontrar /:id', async () => {

    const res = {};
    const req = { params: { id: '1234' } };

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    sinon
      .stub(productsService, 'getById')
      .resolves({ type: 'Product not found', message: 'Product not found' });

    await productsController.getById(req, res);

    expect(res.status).to.have.been.calledWith(404);
    expect(res.json).to.have.been.calledWith({ message: 'Product not found' });
  });
});

