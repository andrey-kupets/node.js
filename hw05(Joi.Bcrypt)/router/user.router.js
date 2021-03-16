const router = require('express').Router();

const { userController } = require('../controller');
const { userMiddlewares } = require('../middleware');

router.route('/')
    .post(
        userMiddlewares.isUserValid,
        userMiddlewares.doesUserExist,
        userController.createUser
    )
    .get(
        // userMiddlewares.areNoUsers, // нельзя выдавать ошибку, если не нашлось по запросу, -- выводить пустой массив
        userController.getAllUsers
    );

router.route('/:userId')
    .delete(
        userMiddlewares.isUserIdValid,
        userController.deleteUser
    )
    .get(
        userMiddlewares.isUserIdValid,
        userMiddlewares.isNoUser,
        userController.getUserById
    )
    .put(
        userMiddlewares.isUserIdValid,
        userMiddlewares.isNoUser,
        userController.updateUser
    );

module.exports = router;
