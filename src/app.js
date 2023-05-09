const express = require('express');
const controller = require('./controllers/products.controller');
const { nameValidation } = require('./middlewares/validations');
require('express-async-errors');

const app = express();

app.use(express.json());

// não remova esse endpoint, é para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.get('/products', controller.getAll);
app.get('/products/:id', controller.getById);
// app.get('/sales', controller);
app.post('/products', nameValidation, controller.create);
// app.delete('/products/:id', controller.exclude);

// não remova essa exportação, é para o avaliador funcionar
// você pode registrar suas rotas normalmente, como o exemplo acima
// você deve usar o arquivo index.js para executar sua aplicação 
module.exports = app;