module.exports = {
    JWT_SECRET: process.env.JWT_SECRET || 'SECRET',
    JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET || 'REFRESH_SECRET',
    MONGO_URL: process.env.MONGO_URL || 'mongodb://localhost/sep-2020',
    PORT: 5000
};
