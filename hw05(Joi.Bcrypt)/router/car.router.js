const router = require('express').Router();

const { carController } = require('../controller');
const { carMiddlewares } = require('../middleware');

router.post('/',
    carMiddlewares.isCarValid,
    carMiddlewares.doesCarExist,
    carController.createCar);

router.get('/',
    carMiddlewares.areNoCars,
    carController.getAllCars);

router.delete('/:carId',
    carMiddlewares.isCarIdValid,
    carMiddlewares.isNoCar,
    carController.deleteCar);

router.get('/:carId',
    carMiddlewares.isCarIdValid,
    carMiddlewares.isNoCar,
    carController.getCarById);

router.put('/:carId',
    carMiddlewares.isCarIdValid,
    carMiddlewares.isNoCar,
    carController.updateCar);

module.exports = router;
