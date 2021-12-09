const cron = require('node-cron');

const { deleteAuthRecords } = require('../service/auth.service');

module.exports = () => {
  cron.schedule('*/5 * * * * *', async () => {
    await deleteAuthRecords();

    console.log('fight');
  });
};
