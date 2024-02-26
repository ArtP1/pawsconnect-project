require('dotenv').config();


module.exports = {
    PORT: process.env.PORT || 3001,
    db: {
        PROTOCOL: process.env.DB_PROTOCOL,
        HOST: process.env.DB_HOST,
        USER: process.env.DB_USER,
        PASSWORD: process.env.DB_PASSWORD,
        DATABASE: process.env.DB_NAME
    },
    security: {
        SALT_ROUNDS: process.env.SALT_ROUNDS,
        ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET,
        REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET,
        CORS_ORIGIN: process.env.CORS_ORIGIN,
        ACCESS_TOKEN_EXPIRES_IN: process.env.ACCESS_TOKEN_EXPIRES,
        REFRESH_TOKEN_EXPIRES_IN: process.env.REFRESH_TOKEN_EXPIRES
    },
}