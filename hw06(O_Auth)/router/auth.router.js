const router = require('express').Router();

const { authController } = require('../controller');
const { authMiddlewares } = require('../middleware');

router.post('/', authMiddlewares.authValid, authController.authUser);
router.post('/reset', authMiddlewares.authValid, authController.reAuthUser);

module.exports = router;
