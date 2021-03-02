const carService = require('../service/car.service');
const resCode = require('../constant/responseCodes.enum');
const { carMsg: { confirmMsg } } = require('../messages');

module.exports = {
    createCar: async (req, res) => {
        const { preferLang = 'ua' } = req.body;

        try {
            await carService.createCar(req.body, preferLang);

            res.status(resCode.CREATED).json(confirmMsg.CAR_CREATED[preferLang]);
        } catch (e) {
            res.status(resCode.BAD_REQUEST).json(e.message);
        }
    },

    getAllCars: async (req, res) => {
        const { query } = req;

        try {
            const cars = await carService.findAllCars(query);

            res.status(resCode.OK).json(cars);
        } catch (e) {
            res.status(resCode.BAD_REQUEST).json(e.message);
        }
    },

    deleteCar: async (req, res) => {
        const { carId } = req.params;

        try {
            await carService.deleteCar(carId);

            res.json('Car is deleted').status(resCode.NO_CONTENT);
        } catch (e) {
            res.status(resCode.BAD_REQUEST).json(e.message);
        }
    },

    getCarById: async (req, res) => {
        const { params: { carId } } = req;

        try {
            const car = await carService.findCarById(carId);

            res.status(resCode.OK).json(car);
        } catch (e) {
            res.status(resCode.BAD_REQUEST).json(e.message);
        }
    },

    updateCar: async (req, res) => {
        try {
            const { carId } = req.params;
            const { preferLang = 'ua' } = req.body;

            await carService.shiftCar(carId, req.body);

            res.status(resCode.OK).json(confirmMsg.CAR_UPDATED[preferLang]);
        } catch (e) {
            res.status(resCode.BAD_REQUEST).json(e.messages);
        }
    }
};
