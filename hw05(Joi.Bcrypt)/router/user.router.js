const router = require('express').Router();

const { userController } = require('../controller');
const { userMiddlewares } = require('../middleware');

router.post('/',
    userMiddlewares.isUserValid,
    userMiddlewares.doesUserExist,
    userController.createUser);

router.get('/',
    userMiddlewares.areNoUsers,
    userController.getAllUsers);

router.delete('/:userId',
    userMiddlewares.isUserIdValid,
    userController.deleteUser);

router.get('/:userId',
    userMiddlewares.isUserIdValid,
    userMiddlewares.isNoUser,
    userController.getUserById);

router.put('/:userId',
    userMiddlewares.isUserIdValid,
    userMiddlewares.isNoUser,
    userController.updateUser);

module.exports = router;
