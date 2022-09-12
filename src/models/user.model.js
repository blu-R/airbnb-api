const { db, DataTypes } = require("../utils/database");

const Users = db.define("users", {
    id: {
        primaryKey: true,
        type: DataTypes.UUID,
        allowNull: false,
    },
    firstName: {
        allowNull: false,
        type: DataTypes.STRING,
        field: "first_name",
        validate: {
            len: [2, 35],
        },
    },
    lastName: {
        allowNull: false,
        type: DataTypes.STRING,
        field: "last_name",
        validate: {
            len: [2, 45],
        },
    },
    email: {
        allowNull: false,
        type: DataTypes.STRING,
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
        validate: {
            len: [10, 15],
        },
    },
    birthdayDate: {
        allowNull: false,
        type: DataTypes.DATEONLY,
        field: "birthday_date",
    },
    role: {
        allowNull: false,
        type: DataTypes.STRING,
        defaultValue: "normal",
    },
    profileImage: {
        type: DataTypes.STRING,
        field: "profile_image",
        /*  validate: {
            isUrl: true,
        }, */
    },
    country: {
        allowNull: false,
        type: DataTypes.STRING,
        validate: {
            len: [2, 2],
        },
    },
    status: {
        allowNull: false,
        type: DataTypes.STRING,
        defaultValue: "active", // active, non-active, deleted, suspended
    },
    verified: {
        allowNull: false,
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
    createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
        field: "created_at",
    },
    updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
        field: "updated_at",
    },
});

module.exports = Users;
