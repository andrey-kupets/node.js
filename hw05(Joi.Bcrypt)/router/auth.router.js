const router = require('express').Router();

const { authController } = require('../controller');
const { authMiddlewares } = require('../middleware');

router.post('/', authMiddlewares.authValid, authController.authorize);

module.exports = router;
