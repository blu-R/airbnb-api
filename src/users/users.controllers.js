const uuid = require("uuid");
const { hashPassword } = require("../utils/crypt");

const Users = require("../models/users.model");
const Roles = require("../models/roles.model");

const getAllUsers = async () => {
    const data = await Users.findAll({
        attributes: {
            exclude: ["password"],
        },
    });

    return data;
    //? select * from users;
};

const getUserById = async id => {
    const data = await Users.findOne({
        where: {
            id,
        },
        attributes: {
            exclude: ["password"],
        },
    });
    //console.log(data);
    return data;
    //? select * from users where id = ${id};
};

const createUser = async data => {
    const newUser = await Users.create({
        id: uuid.v4(),
        password: hashPassword(data.password),
        roleID: "203cffb1-c847-49fd-88ab-97f1ca99ce16",
        status: "active",
        verified: false,
        firstName: data.firstName,
        lastName: data.lastName,
        gender: data.gender,
        email: data.email,
        phone: data.phone,
        birthdayDate: data.birthdayDate,
        dni: data.dni,
        address: data.address,
        profileImage: data.profileImage,
    });
    return newUser;
};

const editUser = async (userId, data, userRoleId) => {
    const { id, password, verified, roleID, ...restOfProperties } = data;
    if (userRoleId === "e3ec98b6-d116-44e6-9e19-a4c5300b0675") {
        const response = await Users.update(
            {
                ...restOfProperties,
                roleID,
            },
            {
                where: {
                    id: userId,
                },
            }
        );
        return response;
    } else {
        const response = await Users.update(
            restOfProperties,

            {
                where: {
                    id: userId,
                },
            }
        );
        return response;
    }
};

const deleteUser = async id => {
    const data = await Users.destroy({
        where: {
            id,
        },
    });
    return data;
};

const getUserByEmail = async email => {
    const data = await Users.findOne({
        where: {
            email,
        },
        exclude: ["createdAt", "updatedAt"],
    });

    return data;

    //? select * from userswhere email = ${email};
};

const editProfileImg = async (userId, imgUrl) => {
    const data = await Users.update(
        {
            profileImage: imgUrl,
        },
        {
            where: { id: userId },
        }
    );
    return data;
};

const getUserWithRole = async userID => {
    const data = await Users.findAll({
        where: { id: userID },
        include: {
            model: Roles,
            as: "role",
            attributes: {
                exclude: ["id", "createdAt", "updatedAt"],
            },
        },

        attributes: {
            exclude: ["password", "createdAt", "updatedAt", "roleID"],
        },
    });
    return data;
};

module.exports = {
    getAllUsers,
    getUserById,
    createUser,
    editUser,
    deleteUser,
    getUserByEmail,
    editProfileImg,
    getUserWithRole,
};
