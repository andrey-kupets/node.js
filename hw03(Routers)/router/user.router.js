const router = require('express').Router();

const userController = require('../controller/user.controller');
const userMiddleware = require('../middleware/user.middleware');

router.post('/', userMiddleware.isUserValid, userController.createUser);

router.get('/', userController.getAllUsers);

// eslint-disable-next-line max-len
// router.get('/search/:name', userMiddleware.isNameValid, userController.getUserByName); // - нельзя на одном методе (GET) искать по имени или айди не меняя урлы налаживается со строкой 14 - будет действовать первая в очереди - разделил /search

router.delete('/:userId', userMiddleware.isIdValid, userController.deleteUser);

router.get('/:userId', userMiddleware.isIdValid, userController.getUserById);

module.exports = router;
