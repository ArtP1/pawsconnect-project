require('dotenv').config();


module.exports = {
    db: {
        PROTOCOL: process.env.DB_PROTOCOL,
        HOST: process.env.DB_HOST,
        USER: process.env.DB_USER,
        PASSWORD: process.env.DB_PASSWORD,
        DATABASE: process.env.DB_NAME,
        tables: {
            u: process.env.DB_TABLE_U,
            r: process.env.DB_TABLE_R
        }
    },
    server: {
        PORT: process.env.SERVER_PORT || 3000,
        SECRET_KEY: process.env.SECRET_KEY
    },
    client: {
        BASE_URL: process.env.VITE_API_BASE_URL,
    }
}