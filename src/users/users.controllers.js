const uuid = require("uuid");
const { hashPassword } = require("../utils/crypt");

const Users = require("../models/user.model");

const usersDB = [
    {
        id: "774495ba-483b-49c4-b17c-a0a1bfa3796f",
        first_name: "Corco",
        last_name: "Bain",
        email: "corco.bain@acme.com",
        password:
            "$2b$10$.8kQe57PufXmZLeuJOeHSeT2mW58qDwK.cFZUECLPW/DZ8QMq1HXi",
        phone: "+5196432542",
        birthday_date: "02/11/1999",
        role: "admin",
        profile_image: "",
        country: "PE",
        is_active: true,
        verified: false,
    },
    {
        id: "7dbe219f-9d04-4639-a3b8-0cdb0663306b",
        first_name: "Elsa",
        last_name: "Pito",
        email: "elsa.pito@acme.com",
        password:
            "$2b$10$LuYGioiQwYPvxFkDd6He7u4MEUboeGSdGbmVUUIKHNGrAjJWVOVui",
        phone: "+51962222542",
        birthday_date: "02/05/2002",
        role: "normal",
        profile_image: "",
        country: "PE",
        is_active: true,
        verified: false,
    },
];

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
    return data;
    //? select * from users where id = ${id};
};

const createUser = async data => {
    const newUser = await Users.create({
        id: uuid.v4(),
        password: hashPassword(data.password),
        role: "normal",
        is_active: true,
        verified: false,
        first_name: data.first_name,
        last_name: data.last_name,
        email: data.email,
        birthday_date: data.birthday_date,
        country: data.country,
        phone: data.phone ? data.phone : null,
        profile_image: data.profile_image ? data.profile_image : null,
    });
    return newUser;
};

const editUser = async (userId, data, userRol) => {
    if (userRol === "admin") {
        const { id, password, verified, ...newData } = data;
        const response = await Users.update(
            {
                ...newData,
            },
            {
                where: {
                    id: userId,
                },
            }
        );
        return response;
    } else {
        const { id, password, verified, role, ...newData } = data;
        const response = await Users.update(
            {
                ...newData,
            },
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
    });
    //console.log(data[0].dataValues);
    return data[0] ? data[0].dataValues : false;
    //? select * from users where email = ${email};
};

const editProfileImg = (userId, imgUrl) => {
    const index = usersDB.findIndex(user => user.id === userId);
    if (index !== -1) {
        usersDB[index].profile_image = imgUrl;
        return usersDB[index];
    }
    return false;
};
// console.log(createUser({ password: "1234" }));

module.exports = {
    getAllUsers,
    getUserById,
    createUser,
    editUser,
    deleteUser,
    getUserByEmail,
    editProfileImg,
};
