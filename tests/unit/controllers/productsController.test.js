const { expect } = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const chai = require("chai");

chai.use(sinonChai);

const productsService = require('../../../src/services/products.service');
const productsController = require('../../../src/controllers/products.controller');
const { correctReturn, newProduct, updatedProduct } = require('../controllers/controllerMocks');

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

  it('Atualiza um produto corretamente e retorna o produto atualizado', async function () {
    const req = {
      body: { name: 'Laço da mulher maravilha' },
      params: { id: 1 },
    };
    const res = {};

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    sinon
      .stub(productsService, 'update')
      .resolves({ type: null, message: updatedProduct });

    await productsController.update(req, res);

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(updatedProduct);
  });

  it('Tenta atualizar produto que não existe e retorna erro', async function () {
    const req = {
      body: { name: 'Laço da mulher maravilha' },
      params: { id: 999 },
    };
    const res = {};

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    sinon
      .stub(productsService, 'update')
      .resolves({ type: 404, message: 'Product not found' });

    await productsController.update(req, res);

    expect(res.status).to.have.been.calledWith(404);
    expect(res.json).to.have.been.calledWith({ message: 'Product not found' });
  });

  it('Insere um produto corretamente e retorna o status correto e o novo produto', async function () {
    const req = {
      body: { name: 'Laço da mulher maravilha' },
    };
    const res = {};

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    sinon
      .stub(productsService, 'create')
      .resolves({ type: null, message: newProduct });

    await productsController.create(req, res);

    expect(res.status).to.have.been.calledWith(201);
    expect(res.json).to.have.been.calledWith(newProduct);
  });

/*   it('Deleta produto que não existe e retorna erro', async function () {
    const req = {
      params: { id: 999 },
    };
    const res = {};

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    sinon
      .stub(productsService, 'exclude')
      .resolves({ type: 404, message: 'Product not found' });

    await productsController.exclude(req, res);

    expect(res.status).to.have.been.calledWith(404);
    expect(res.json).to.have.been.calledWith({ message: 'Product not found' });
  }); */
});