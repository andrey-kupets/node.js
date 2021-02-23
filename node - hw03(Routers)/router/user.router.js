const router = require('express').Router();

const userController = require('../controller/user.controller');

router.post('/', userController.makeUser);

router.get('/', userController.getAllUsers);

router.get('/:name', userController.getUserByName);

router.delete('/:userId', userController.kickOutUser);

router.get('/search/:userId', userController.getUserById); // нельзя на одном методе (GET) искать по имени или айди не меняя урлы - будет действовать первая в очереди - разделил /search

module.exports = router;
