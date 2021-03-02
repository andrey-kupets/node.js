const router = require('express').Router();

// const { authRouter, carRouter, userRouter } = require('.'); // выдаёт ошибку
// const { authRouter, carRouter, userRouter } = require('./index'); // выдаёт ошибку
const authRouter = require('./auth.router');
const carRouter = require('./car.router');
const userRouter = require('./user.router');

router.use('/auth', authRouter);
router.use('/cars', carRouter);
router.use('/users', userRouter);

module.exports = router;
