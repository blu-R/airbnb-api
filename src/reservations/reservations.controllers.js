const uuid = require("uuid");
const Reservation = require("../models/reservations.model");
const User = require("../models/users.model");
const Accommodation = require("../models/accommodations.model");

const getAllReservations = async () => {
    const data = await Reservation.findAll({
        include: [
            {
                model: User,
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
            {
                model: Accommodation,
                attributes: {
                    exclude: ["isActive", "createdAt", "updatedAt"],
                },
            },
        ],
        attributes: {
            exclude: ["userId", "accommodationId", "createdAt", "updatedAt"],
        },
    });
    return data;
};

const getReservationById = async id => {
    const data = await Reservation.findOne({
        where: {
            id,
        },
    });
    return data;
};

const createReservation = async (data, userId, accommodationId) => {
    const { isFinished, isCanceled, ...restOfData } = data;
    const newReservation = await Reservation.create({
        ...restOfData,
        id: uuid.v4(),
        userId: userId,
        accommodationId: accommodationId,
    });
    return newReservation;
};

const updateReservation = async (data, reservationId) => {
    const { id, ...restOfData } = data;

    const response = Reservation.update(restOfData, {
        where: {
            id: reservationId,
        },
    });
    return response;
};

module.exports = {
    createReservation,
    getAllReservations,
    updateReservation,
    getReservationById,
};
