const { db, DataTypes } = require("../utils/database");

const Users = db.define("users", {
    id: {
        primaryKey: true,
        type: DataTypes.UUID,
        allowNull: false,
    },
    firstName: {
        allowNull: false,
        type: DataTypes.STRING(35),
        field: "first_name",
        validate: {
            len: [2, 35],
        },
    },
    lastName: {
        allowNull: false,
        type: DataTypes.STRING(45),
        field: "last_name",
        validate: {
            len: [2, 45],
        },
    },
    gender: {
        allowNull: false,
        type: DataTypes.STRING(20),
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
    dni: {
        type: DataTypes.STRING,
    },
    roleID: {
        allowNull: false,
        type: DataTypes.UUID,
        field: "role_id",
    },
    address: {
        type: DataTypes.STRING,
    },
    profileImage: {
        type: DataTypes.STRING,
        field: "profile_image",
        validate: {
            isUrl: true,
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
