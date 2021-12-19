const { authService } = require('../service');

const d = new Date();
d.setDate(d.getDate() - 5);
console.log(d);

module.exports = () => authService.deleteAuthRecords({ createdAt: { $gte: d } });
