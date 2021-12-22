const { authService } = require('../service');

const d = new Date();
d.setDate(d.getDate() - 5);
const q = d.toISOString();

module.exports = () => authService.deleteAuthRecords(q);
