const carService = require('../service/car.service');
const resCode = require('../constant/responseCodes.enum');
const confirmMessages = require('../messages/car/confirm.messages');

module.exports = {
    createCar: async (req, res) => {
        const { preferLang = 'ua' } = req.body;

        try {
            await carService.createCar(req.body, preferLang);

            res.status(resCode.CREATED).json(confirmMessages.CAR_CREATED[preferLang]);
        } catch (e) {
            res.status(resCode.BAD_REQUEST).json(e.message);
        }
    },

    getAllCars: async (req, res) => {
        const { query, body: { preferLang = 'ua' } } = req;

        try {
            const cars = await carService.findAllCars(query, preferLang);

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
        const { params: { carId }, body: { preferLang = 'ua' } } = req;

        try {
            const car = await carService.findCarById(carId, preferLang);

            res.status(resCode.OK).json(car);
        } catch (e) {
            res.status(resCode.BAD_REQUEST).json(e.message);
        }
    }
};
