require("dotenv").config();

module.exports = {
    port: process.env.PORT || 8888,
    jwt_secret: process.env.JWT_SECRET,
    db_dialect: process.env.DB_DIALECT,
    db_host: process.env.DB_HOST,
    db_username: process.env.DB_USERNAME,
    db_password: process.env.DB_PASSWORD,
    db_name: process.env.DB_NAME,
    db_port: process.env.DB_PORT,
};
