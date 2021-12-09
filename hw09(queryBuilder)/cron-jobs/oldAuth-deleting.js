const { authService } = require('../service');

const d = new Date();
d.setDate(d.getDate() - 5);

module.exports = () => authService.deleteAuthRecords({ createdAt: { gte: d } });
