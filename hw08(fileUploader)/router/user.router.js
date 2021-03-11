const router = require('express').Router();

const { userController } = require('../controller');
const { authMiddlewares, fileMiddlewares, userMiddlewares } = require('../middleware');

router.route('/')
    .post(
        fileMiddlewares.checkFile,
        fileMiddlewares.checkPhotoForAvatar,
        userMiddlewares.isUserValid,
        userMiddlewares.doesUserExist,
        userController.createUser
    )
    .get(
        userMiddlewares.areNoUsers,
        userController.getAllUsers
    );

router.route('/:userId')
    .delete(
        userMiddlewares.isUserIdValid,
        authMiddlewares.checkAccessToken,
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
