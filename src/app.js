const express = require('express');
const controller = require('./controllers/products.controller');
const salesController = require('./controllers/sales.controller');
// const { productValidate, } = require('./middlewares/salesValidations');
const {
  nameValidation,
  correctInput,
  correctQuantity } = require('./middlewares/productValidation');

require('express-async-errors');

const app = express();

app.use(express.json());

// não remova esse endpoint, é para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.get('/products', controller.getAll);
app.get('/products/:id', controller.getById);
app.post('/products', nameValidation, controller.create);
app.put('/products/:id', nameValidation, controller.update);
app.delete('/products/:id', controller.exclude);

app.get('/sales', salesController.getSales);
app.post('/sales', correctInput, correctQuantity, salesController.getSales);

// não remova essa exportação, é para o avaliador funcionar
// você pode registrar suas rotas normalmente, como o exemplo acima
// você deve usar o arquivo index.js para executar sua aplicação 
module.exports = app;