const router = require('express').Router();

const userController = require('../controller/user.controller');
const userMiddleware = require('../middleware/user.middleware');

router.post('/', userMiddleware.isUserValid, userController.createUser);

router.get('/', userController.getAllUsers);

router.delete('/:userId', userMiddleware.isIdValid, userController.deleteUser);

router.get('/:userId', userMiddleware.isIdValid, userController.getUserById);

module.exports = router;
