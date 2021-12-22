const cron = require('node-cron');

const deleteAuthRecords = require('./oldAuth-deleting');

module.exports = () => {
  cron.schedule('59 23 * * *', async () => {
    await deleteAuthRecords();
  });
};
