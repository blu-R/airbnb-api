const accommodationControllers = require("./accommodations.controllers");

const getAll = (req, res) => {
    accommodationControllers
        .getAllAccommodations()
        .then(response => {
            res.status(200).json({
                items: response.length,
                accommodations: response,
            });
        })
        .catch(err => {
            res.status(400).json(err);
        });
};

const getById = (req, res) => {
    const id = req.params.id;
    accommodationControllers
        .getAccommodationById(id)
        .then(response => {
            if (!response) {
                return res
                    .status(404)
                    .json({ message: "Invalid ID. User doesn't exist" });
            }
            res.status(200).json(response);
        })
        .catch(err => {
            res.status(400).json(err);
        });
};

const create = (req, res) => {
    const userId = req.user.id;
    const data = req.body;
    accommodationControllers
        .createAccommodation(userId, data)
        .then(response => {
            res.status(201).json(response);
        })
        .catch(err => {
            res.status(400).json({ status: 400, message: err.message });
        });
};

const edit = (req, res) => {
    const id = req.params.id;
    const data = req.body;

    accommodationControllers
        .editAccommodation(id, data)
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

const remove = (req, res) => {
    const id = req.params.id;
    const roleIID = req.user.role;

    accommodationControllers
        .deleteAccommodation(id, null, roleIID)
        .then(response => {
            if (response) {
                return res.status(204).json();
            } else {
                return res
                    .status(404)
                    .json({ message: "Invalid ID. User not found" });
            }
        })
        .catch(err => res.status(400).json({ message: "error", err }));
};

module.exports = {
    getAll,
    getById,
    create,
    edit,
    remove,
};
