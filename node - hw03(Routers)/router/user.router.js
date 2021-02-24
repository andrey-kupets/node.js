const router = require('express').Router();

const userController = require('../controller/user.controller');
const userMiddleware = require('../middleware/user.middleware');

router.post('/', userMiddleware.isUserValid, userController.createUser);

router.get('/', userController.getAllUsers);

router.get('/:name', userMiddleware.isNameValid, userController.getUserByName);

router.delete('/:userId', userController.deleteUser);

router.get('/search/:userId', userMiddleware.isIdValid, userController.getUserById); // - нельзя на одном методе (GET) искать по имени или айди не меняя урлы налаживается со строкой 10 - будет действовать первая в очереди - разделил /search

module.exports = router;
