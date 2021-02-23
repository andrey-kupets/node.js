const router = require('express').Router();

const userController = require('../controller/user.controller');
const userMiddleware = require('../middleware/user.middleware');

router.get('/', userController.getAllUsers);

router.get('/:userId', userMiddleware.checkIsValid, userController.getOneUser);

router.post('/', userMiddleware.isUserValid, userController.createOneUser);

module.exports = router;
