const router = require('express').Router();

const userController = require('../controller/user.controller');
// const userMiddleware = require('../middleware/**********');

router.get('/', userController.getAllUsers);

router.get('/:userId', userController.getOneUser);

router.post('/', userController.createOneUser);

module.exports = router;
