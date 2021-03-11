const router = require('express').Router();

const { carController } = require('../controller');
const { carMiddlewares, fileMiddlewares } = require('../middleware');

router.route('/')
    .post(
        fileMiddlewares.checkFile,
        carMiddlewares.isCarValid,
        carMiddlewares.doesCarExist,
        carController.createCar
    )
    .get(
        carMiddlewares.areNoCars,
        carController.getAllCars
    );

router.route('/:carId')
    .delete(
        carMiddlewares.isCarIdValid,
        carMiddlewares.isNoCar,
        carController.deleteCar
    )
    .get(
        carMiddlewares.isCarIdValid,
        carMiddlewares.isNoCar,
        carController.getCarById
    )
    .put(
        carMiddlewares.isCarIdValid,
        carMiddlewares.isNoCar,
        carController.updateCar
    );

module.exports = router;
