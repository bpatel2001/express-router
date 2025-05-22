const express = require('express');
const userRouter = express.Router();
const { User } = require('../models/index');
const { check, validationResult } = require('express-validator');

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

userRouter.post('/', [check("name").not().isEmpty().trim()], async (request, response) => {
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
        return response.json({ errors: errors.array() });
    }
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