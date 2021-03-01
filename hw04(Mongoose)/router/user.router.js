const router = require('express').Router();

const userController = require('../controller/user.controller');
const userMiddleware = require('../middleware/user.middleware');

router.post('/', userMiddleware.isUserValid, userMiddleware.doesUserExist, userController.createUser);

router.get('/', userMiddleware.areNoUsers, userController.getAllUsers);

router.delete('/:userId', userMiddleware.isUserIdValid, userController.deleteUser);

router.get('/:userId', userMiddleware.isUserIdValid, userMiddleware.isNoUser, userController.getUserById);

module.exports = router;
