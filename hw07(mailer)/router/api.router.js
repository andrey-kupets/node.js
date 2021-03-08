const router = require('express').Router();

const { authRouter, carRouter, userRouter } = require('.');

router.use('/auth', authRouter);
router.use('/cars', carRouter);
router.use('/users', userRouter);

module.exports = router;
