const express = require('express');
const controller = require('./controllers/products.controller');
const nameValidation = require('./middlewares/validations');

const app = express();

// não remova esse endpoint, é para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.get('/products', controller.getAll);
app.get('/products/:id', controller.getById);
app.post('/products', nameValidation, controller.create);

// não remova essa exportação, é para o avaliador funcionar
// você pode registrar suas rotas normalmente, como o exemplo acima
// você deve usar o arquivo index.js para executar sua aplicação 
module.exports = app;