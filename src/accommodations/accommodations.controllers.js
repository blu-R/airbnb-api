const uuid = require("uuid");
const Accommodation = require("../models/accommodations.model");

const Place = require("../models/places.model");
const User = require("../models/users.model");

const getAllAccommodations = async () => {
    const data = await Accommodation.findAll({
        include: [
            {
                model: Place,
                attributes: {
                    exclude: ["createdAt", "updatedAt"],
                },
            },
            {
                model: User,
                as: "user",
                attributes: {
                    exclude: [
                        "createdAt",
                        "updatedAt",
                        "password",
                        "birthdayDate",
                        "dni",
                        "roleID",
                        "status",
                    ],
                },
            },
        ],
        attributes: {
            exclude: [
                "createdAt",
                "updatedAt",
                "userId",
                "placeId",
                "isActive",
            ],
        },
    });

    // const data = await Users.findAll({
    //     include: {
    //         model: Accommodations,
    //         include: {
    //             model: Places,
    //             attributes:{
    //                 exclude: ['createdAt', 'updatedAt']
    //             }
    //         }
    //     }
    // })
    return data;
};

const createAccommodation = async (userId, data) => {
    const { id, isActive, score, ...restOfProperties } = data;
    const newAccommodation = await Accommodation.create({
        ...restOfProperties,
        id: uuid.v4(),
        userId,
        score: 0,
    });
    return newAccommodation;
};

const editAccommodation = async (accId, data) => {
    const { id, score, ...restOfProperties } = data;

    const response = await Accommodation.update(
        restOfProperties,

        {
            where: {
                id: accId,
            },
        }
    );
    return response;
};

const getAccommodationById = async id => {
    const data = await Accommodation.findOne({
        where: {
            id,
        },
        include: [
            {
                model: Place,
                attributes: {
                    exclude: ["createdAt", "updatedAt"],
                },
            },
            {
                model: User,
                as: "user",
                attributes: {
                    exclude: [
                        "createdAt",
                        "updatedAt",
                        "password",
                        "birthdayDate",
                        "dni",
                        "roleID",
                        "status",
                    ],
                },
            },
        ],
        attributes: {
            exclude: [
                "createdAt",
                "updatedAt",
                "userId",
                "placeId",
                "isActive",
            ],
        },
    });
    return data;
};

const deleteAccommodation = async (id, userID, roleID) => {
    if (roleID === "e3ec98b6-d116-44e6-9e19-a4c5300b0675") {
        const data = await Accommodation.destroy({
            where: {
                id,
            },
        });
        return data;
    } else {
        const data = await Accommodation.destroy({
            where: {
                id,
                userId: userID,
            },
        });
        return data;
    }
};

const getAllAccommodationsByUser = async id => {
    const data = await User.findAll({
        where: { id },
        include: {
            model: Accommodation,
        },
    });
    return data;
};

module.exports = {
    getAllAccommodations,
    getAccommodationById,
    createAccommodation,
    editAccommodation,
    deleteAccommodation,
    getAllAccommodationsByUser,
};
