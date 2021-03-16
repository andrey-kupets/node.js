const router = require('express').Router();

const { carController } = require('../controller');
const { carMiddlewares } = require('../middleware');

router.route('/')
    .post(
        carMiddlewares.isCarValid,
        carMiddlewares.doesCarExist,
        carController.createCar
    )
    .get(
        // carMiddlewares.areNoCars, // нельзя выдавать ошибку, если не нашлось по запросу, -- выводить пустой массив
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
