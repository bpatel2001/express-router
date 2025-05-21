const express = require('express');
const userRouter = express.Router();
const { User } = require('../models/index');

userRouter.use(express.json());
userRouter.use(express.urlencoded());

userRouter.get('/', async (request, response) => {
    const users = await User.findAll();
    response.json(users);
});

userRouter.get('/:id', async (request, response) => {
    const id = request.params.id;

    const user = await User.findByPk(id);

    response.json(user);
});

userRouter.post('/', async (request, response) => {
    const user = await User.create(request.body);

    response.json(user);
});

userRouter.put('/:id', async (request, response) => {
    const userId = request.params.id;

    const user = await User.update(request.body, {
        where: { id: userId }
    });

    response.json(user);
});

userRouter.delete('/:id', async (request, response) => {
    const userId = request.params.id;

    const user = await User.destroy({
        where: { id: userId }
    });

    response.json(user);
});

module.exports = userRouter;