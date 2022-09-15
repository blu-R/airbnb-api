const { Sequelize, DataTypes } = require("sequelize");
const data = require("../config");

const db = new Sequelize({
    dialect: data.db_dialect,
    host: data.db_host,
    username: data.db_username,
    password: data.db_password,
    database: data.db_name,
    port: data.db_port,
    logging: false,
    dialectOptions:
        process.env.NODE_ENV === "production"
            ? {
                  ssl: {
                      require: true,
                      rejectUnauthorized: false,
                  },
              }
            : {},
});

module.exports = {
    db,
    DataTypes,
};
