const { port } = require("../config");
const userControllers = require("./users.controllers");

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
        !data.email ||
        !data.phone ||
        !data.password ||
        !data.birthdayDate
    ) {
        return res.status(400).json({
            message: "All fields must be completed",
            fields: {
                firstName: "string",
                lastName: "string",
                email: "example@example.com",
                phone: "string",
                password: "string",
                birthdayDate: "YYYY-MM-DD",
                country: "string",
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
            .catch(err => res.status(400).json({ err }));
    }
};

const edit = (req, res) => {
    const id = req.params.id;
    const user = req.body;

    if (!Object.keys(user).length) {
        return res.status(400).json({ message: "Missing data" });
    } else if (
        !user.firstName ||
        !user.lastName ||
        !user.email ||
        !user.role ||
        !user.birthdayDate ||
        !user.country ||
        !user.status
    ) {
        return res.status(400).json({
            message: "All fields must be completed",
            fields: {
                firstName: "string",
                lastName: "string",
                email: "example@example.com",
                role: "normal",
                birthdayDate: "YYYY-MM-DD",
                country: "string",
                status: "string",
            },
        });
    } else {
        userControllers
            .editUser(id, user, req.user.role)
            .then(response => {
                if (!response[0]) {
                    return res
                        .status(404)
                        .json({ message: "Invalid ID. User not found" });
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
            return res.status(400).json({ message: "Invalid ID", err });
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
    } else if (
        !user.firstName ||
        !user.lastName ||
        !user.email ||
        !user.phone ||
        !user.birthdayDate ||
        !user.country ||
        !user.status
    ) {
        return res.status(400).json({
            message: "All fields must be completed",
            fields: {
                firstName: "string",
                lastName: "string",
                email: "example@example.com",
                phone: "+51646461616",
                birthdayDate: "YYYY-MM-DD",
                country: "string",
                status: "string",
            },
        });
    } else {
        userControllers
            .editUser(id, user, req.user.role)
            .then(response => {
                if (!response[0]) {
                    return res
                        .status(404)
                        .json({ message: "Invalid ID. User not found" });
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
                return res.status(200).json(response);
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
};
