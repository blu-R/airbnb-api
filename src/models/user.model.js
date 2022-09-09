const { db, DataTypes } = require("../utils/database");

const Users = db.define("users", {
    id: {
        primaryKey: true,
        type: DataTypes.UUID,
        allowNull: false,
    },
    first_name: {
        allowNull: false,
        type: DataTypes.STRING,
    },
    last_name: {
        allowNull: false,
        type: DataTypes.STRING,
    },
    email: {
        allowNull: false,
        type: DataTypes.STRING(30),
        unique: true,
        validate: {
            isEmail: true,
        },
    },
    password: {
        allowNull: false,
        type: DataTypes.STRING,
    },
    phone: {
        allowNull: false,
        type: DataTypes.STRING,
    },
    birthday_date: {
        allowNull: false,
        type: DataTypes.DATEONLY,
    },
    role: {
        allowNull: false,
        type: DataTypes.STRING,
        defaultValue: "normal",
    },
    profile_image: {
        type: DataTypes.STRING,
        validate: {
            isUrl: true,
        },
    },
    country: {
        allowNull: false,
        type: DataTypes.STRING,
    },
    is_active: {
        allowNull: false,
        type: DataTypes.BOOLEAN,
        defaultValue: true,
    },
    verified: {
        allowNull: false,
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
});

module.exports = Users;
