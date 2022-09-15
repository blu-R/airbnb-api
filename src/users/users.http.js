const { port } = require("../config");
const userControllers = require("./users.controllers");
const {
    getAllAccommodationsByUser,
    editAccommodation,
    getAccommodationById,
    deleteAccommodation,
} = require("../accommodations/accommodations.controllers");

const getAll = (req, res) => {
    userControllers
        .getAllUsers()
        .then(response => {
            res.status(200).json({ items: response.length, users: response });
        })
        .catch(err => res.status(400).json({ err }));
};

const getById = (req, res) => {
    const id = req.params.id;
    userControllers
        .getUserById(id)
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

const register = (req, res) => {
    const data = req.body;
    if (!Object.keys(data).length) {
        return res.status(400).json({ message: "Missing data" });
    } else if (
        !data.firstName ||
        !data.lastName ||
        !data.gender ||
        !data.email ||
        !data.password ||
        !data.phone ||
        !data.birthdayDate
    ) {
        return res.status(400).json({
            message: "All fields must be completed",
            fields: {
                firstName: "string",
                lastName: "string",
                email: "example@example.com",
                gender: "sting",
                phone: "string",
                password: "string",
                birthdayDate: "YYYY-MM-DD",
            },
        });
    } else {
        userControllers
            .createUser(data)
            .then(response => {
                return res.status(201).json({
                    message: `User created succesfully with id: ${response.id}`,
                    user: response,
                });
            })
            .catch(err => res.status(400).json({ message: "error", err }));
    }
};

const edit = (req, res) => {
    const id = req.params.id;
    const user = req.body;

    if (!Object.keys(user).length) {
        return res.status(400).json({ message: "Missing data" });
    } else {
        userControllers
            .editUser(id, user, req.user.role)
            .then(response => {
                if (!response[0]) {
                    return res
                        .status(404)
                        .json({ message: "Invalid ID. User not found" }); //! also if no field was updated
                }
                return res.status(200).json({
                    message: `User data edited succesfully`,
                    user: response,
                });
            })
            .catch(err => {
                return res.status(400).json({
                    message: "error",
                    err,
                });
            });
    }
};

const remove = (req, res) => {
    const id = req.params.id;
    userControllers
        .deleteUser(id)
        .then(response => {
            if (response) {
                return res.status(204).json(); //? 204 no permite retornar algo, el json nos permite indicar que alli termina la respuesta.
            } else {
                return res
                    .status(404)
                    .json({ message: "Invalid ID. User not found" });
            }
        })
        .catch(err => {
            return res.status(400).json({ message: "error", err });
        });
};

const getMyUser = (req, res) => {
    const id = req.user.id;
    //console.log(id);
    userControllers
        .getUserById(id)
        .then(response => {
            res.status(200).json(response);
        })
        .catch(err => {
            res.status(400).json({ message: "error", err });
        });
};

const editMyUser = (req, res) => {
    const id = req.user.id;
    const user = req.body;

    if (!Object.keys(user).length) {
        return res.status(400).json({ message: "Missing data" });
    } else {
        userControllers
            .editUser(id, user, req.user.role)
            .then(response => {
                if (!response[0]) {
                    return res
                        .status(404)
                        .json({ message: "Invalid ID. User not found" }); //! also if no field was updated
                }
                return res.status(200).json({
                    message: `User data edited succesfully`,
                    user: response,
                });
            })
            .catch(err => {
                return res.status(400).json({
                    message: "error",
                    err,
                });
            });
    }
};

const removeMyUser = (req, res) => {
    const id = req.user.id;
    userControllers
        .deleteUser(id)
        .then(response => {
            if (response) {
                return res.status(204).json(); //? 204 no permite retornar algo, el json nos permite indicar que alli termina la respuesta.
            } else {
                return res
                    .status(404)
                    .json({ message: "Invalid ID. User not found" });
            }
        })
        .catch(err => {
            return res.status(400).json({ message: "error", err });
        });
};

const postProfileImg = (req, res) => {
    const id = req.user.id;
    console.log(req.file);
    const imgPath =
        req.hostname + ":" + port + "/api/v1/uploads/" + req.file.filename;
    userControllers
        .editProfileImg(id, imgPath)
        .then(response => {
            if (response) {
                return res.status(201).json(response);
            }
            return res
                .status(404)
                .json({ message: "Invalid ID. User not found" });
        })
        .catch(err => res.status(400).json({ message: "error", err }));
};

const getUserRole = (req, res) => {
    const id = req.params.id;
    userControllers
        .getUserWithRole(id)
        .then(response => {
            if (!response) {
                return res
                    .status(404)
                    .json({ message: "Invalid ID. User not found" });
            }
            return res.status(200).json(response);
        })
        .catch(err => res.status(400).json({ message: "Error", err }));
};

const getMyAccommodations = (req, res) => {
    const id = req.user.id;
    getAllAccommodationsByUser(id)
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

const editMyAccomodation = (req, res) => {
    const userId = req.user.id;
    const data = req.body;
    const accomodationId = req.params.id;

    getAccommodationById(accomodationId)
        .then(response => {
            if (userId === response.user.id) {
                editAccommodation(accomodationId, data)
                    .then(edited => {
                        return res.status(200).json(edited);
                    })
                    .catch(err =>
                        res.status(400).json({ message: err.message })
                    );
            }
            return res.status(403).json({ message: "Forbidden" });
        })
        .catch(err => res.status(400).json({ message: err.message }));
};

const removeMyAccommodation = (req, res) => {
    const accomodationId = req.params.id;
    const userId = req.user.id;

    deleteAccommodation(accomodationId, userId, null)
        .then(response => {
            if (!response) {
                return res.status(404).json({ message: "Not found" });
            }
            return res.status(204).json();
        })
        .catch(err => {
            return res.status(400).json({ message: "error", err });
        });
};

module.exports = {
    getAll,
    getById,
    register,
    edit,
    remove,
    getMyUser,
    editMyUser,
    removeMyUser,
    postProfileImg,
    getUserRole,
    getMyAccommodations,
    editMyAccomodation,
    removeMyAccommodation,
};
