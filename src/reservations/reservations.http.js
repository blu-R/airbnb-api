const reservationControllers = require("./reservations.controllers");

const postReservation = (req, res) => {
    const userId = req.user.id;
    const data = req.body;
    const accommodationId = req.params.id;

    reservationControllers
        .createReservation(data, userId, accommodationId)
        .then(response => {
            res.status(201).json(response);
        })
        .catch(err => {
            res.status(400).json({ status: 400, message: err.message });
        });
};

const getAll = (req, res) => {
    reservationControllers
        .getAllReservations()
        .then(response => {
            res.status(200).json({ items: response.length, response });
        })
        .catch(err => {
            res.status(400).json({ message: err.message });
        });
};

const update = (req, res) => {
    const id = req.params.id;
    const data = req.body;

    reservationControllers
        .updateReservation(data, id)
        .then(response => {
            if (!response[0]) {
                return res
                    .status(404)
                    .json({ message: "Invalid ID. User not found" }); //! also if no field was updated
            }
            return res.status(200).json(response);
        })
        .catch(err =>
            res.status(400).json({ status: 400, message: err.message })
        );
};

const getById = (req, res) => {
    const id = req.params.id;
    reservationControllers
        .getReservationById(id)
        .then(response => {
            if (!response) {
                return res.status(404).json({
                    message: `Invalid ID. User not found`,
                });
            }
            return res.status(200).json(response);
        })
        .catch(err => {
            return res.status(400).json({
                message: "error",
                err,
            });
        });
};

module.exports = {
    postReservation,
    getAll,
    update,
    getById,
};
