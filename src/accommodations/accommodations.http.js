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

module.exports = {
    getAll,
    getById,
};
