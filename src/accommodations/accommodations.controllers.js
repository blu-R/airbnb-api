const Accommodations = require("../models/accommodations.model");

const Place = require("../models/places.model");
const User = require("../models/users.model");

const getAllAccommodations = async () => {
    const data = await Accommodations.findAll({
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
                    exclude: ["createdAt", "updatedAt"],
                },
            },
        ],
        // attributes: {
        //   exclude: ["createdAt", "updatedAt", "userId", "placeId", "hostId"],
        // },
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

const getAccommodationById = async id => {
    const data = await Accommodations.findOne({
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
                    exclude: ["createdAt", "updatedAt"],
                },
            },
        ],
        attributes: {
            exclude: ["createdAt", "updatedAt", "userId", "placeId", "hostId"],
        },
    });
    return data;
};

module.exports = {
    getAllAccommodations,
    getAccommodationById,
};
