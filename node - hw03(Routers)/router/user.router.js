const router = require('express').Router();

const userController = require('../controller/user.controller');
const userMiddleware = require('../middleware/user.middleware');

router.post('/', userMiddleware.isUserValid, userController.makeUser);

router.get('/', userController.getAllUsers);

router.get('/:name', userMiddleware.isNameValid, userController.getUserByName);

router.delete('/:userId', userController.kickOutUser);

router.get('/search/:userId', userMiddleware.isIdValid, userController.getUserById); // сделал на автомате по ходу разбора лекции - нельзя на одном методе (GET) искать по имени или айди не меняя урлы - будет действовать первая в очереди - разделил /search

module.exports = router;
