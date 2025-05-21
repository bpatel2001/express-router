const express = require('express');
const fruitRouter = express.Router();
const { Fruit } = require('../models/index');

fruitRouter.use(express.json());
fruitRouter.use(express.urlencoded());

fruitRouter.get('/', async (request, response) => {
    const fruits = await Fruit.findAll();
    response.json(fruits);
});

fruitRouter.get('/:id', async (request, response) => {
    const id = request.params.id;

    const fruit = await Fruit.findByPk(id);

    response.json(fruit);
});

fruitRouter.post('/', async (request, response) => {
    const fruit = await Fruit.create(request.body);

    response.json(fruit);
});

fruitRouter.put('/:id', async (request, response) => {
    const fruitId = request.params.id;

    const fruit = await Fruit.update(request.body, {
        where: { id: fruitId }
    });

    response.json(fruit);
});

fruitRouter.delete('/:id', async (request, response) => {
    const fruitId = request.params.id;

    const fruit = await Fruit.destroy({
        where: { id: fruitId }
    });

    response.json(fruit);
});

module.exports = fruitRouter;