const productsTable = require('../services/products.service');

const getAll = async (req, res) => {
  const product = await productsTable.getAll();
  return res.status(200).json(product);
};

const getById = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await productsTable.getById(id);

  if (type) return res.status(404).json({ message: 'Product not found' });

  return res.status(200).json(message);
};

const create = async (req, res) => { // ajuda do Ronald via slack
  const { name } = req.body;
  const result = await productsTable.create(name);

  if (result.type) return res.status(result.type).json({ message: result.message });
  return res.status(201).json(result.message);
};  

const update = async (req, res) => { // ajuda do Muri e do Ronald
  const { name } = req.body;
  const { id } = req.params;
  
  if (!name) {
    return res.status(400).json({ message: '"name" is required' });
  }

  if (name.length < 5) {
    return res.status(422).json({ message: '"name" length must be at least 5 characters long' });
  }

  const { type, message } = await productsTable.update(name, id);
  
  if (type) return res.status(type).json({ message });

  return res.status(200).json(message);
};

const exclude = async (req, res) => { // backend 5.5
  const { id } = req.params;
  const { type } = await productsTable.exclude(id);

  if (type === 'erro') return res.status(404).json({ message: 'Product not found' });

  return res.status(204).json();
};

module.exports = { getAll, getById, create, exclude, update };

// https://dev.to/zagaris/build-a-restful-crud-api-with-node-js-2334
/* Update a specific employee */

/* router.put('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, job } = req.body;
    const result = await schema.validateAsync({ name, job });
    const employee = await employees.findOne({
      _id: id,
    });

    // Employee does not exist
    if (!employee) {
      return next();
    }

    const updatedEmployee = await employees.update({
      _id: id,
    }, { $set: result },
      { upsert: true });

    res.json(updatedEmployee);
  } catch (error) {
    next(error);
  }
}); */
