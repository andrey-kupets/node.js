const { carMsg: { confirmMsg } } = require('../messages');
const { carService } = require('../service');
const { responseCodesEnum } = require('../constant');

module.exports = {
    createCar: async (req, res) => {
        const { preferLang = 'ua' } = req.body;

        try {
            await carService.createCar(req.body, preferLang);

            res.status(responseCodesEnum.CREATED).json(confirmMsg.CAR_CREATED[preferLang]);
        } catch (e) {
            res.status(responseCodesEnum.BAD_REQUEST).json(e.message);
        }
    },

    getAllCars: async (req, res) => {
        const { query } = req;

        try {
            const cars = await carService.findAllCars(query);

            res.status(responseCodesEnum.OK).json(cars);
        } catch (e) {
            res.status(responseCodesEnum.BAD_REQUEST).json(e.message);
        }
    },

    deleteCar: async (req, res) => {
        const { carId } = req.params;

        try {
            await carService.deleteCar(carId);

            res.json('Car is deleted').status(responseCodesEnum.NO_CONTENT);
        } catch (e) {
            res.status(responseCodesEnum.BAD_REQUEST).json(e.message);
        }
    },

    getCarById: async (req, res) => {
        const { params: { carId } } = req;

        try {
            const car = await carService.findCarById(carId);

            res.status(responseCodesEnum.OK).json(car);
        } catch (e) {
            res.status(responseCodesEnum.BAD_REQUEST).json(e.message);
        }
    },

    updateCar: async (req, res) => {
        try {
            const { carId } = req.params;
            const { preferLang = 'ua' } = req.body;

            await carService.shiftCar(carId, req.body);

            res.status(responseCodesEnum.OK).json(confirmMsg.CAR_UPDATED[preferLang]);
        } catch (e) {
            res.status(responseCodesEnum.BAD_REQUEST).json(e.messages);
        }
    }
};
