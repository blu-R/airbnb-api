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
            res.status(200).json(response);
        })
        .catch(err => {
            res.status(404).json({ message: `User with ID ${id} not found` });
        });
};

const register = (req, res) => {
    const data = req.body;
    if (!Object.keys(data).length) {
        return res.status(400).json({ message: "Missing data" });
    } else if (
        !data.first_name ||
        !data.last_name ||
        !data.email ||
        !data.phone ||
        !data.password ||
        !data.birthday_date ||
        !data.country
    ) {
        return res.status(400).json({
            message: "All fields must be completed",
            fields: {
                first_name: "string",
                last_name: "string",
                email: "example@example.com",
                phone: "string",
                password: "string",
                birthday_date: "DD/MM/YY",
                country: "string",
            },
        });
    } else {
        //! sanitizar data
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
        !user.first_name ||
        !user.last_name ||
        !user.email ||
        !user.phone ||
        !user.role ||
        !user.profile_image ||
        !user.birthday_date ||
        !user.country ||
        !user.is_active
    ) {
        return res.status(400).json({
            message: "All fields must be completed",
            fields: {
                first_name: "string",
                last_name: "string",
                email: "example@example.com",
                phone: "+51646461616",
                role: "normal",
                profile_image: "exampli.com/img/example.png",
                birthday_date: "DD/MM/YYYY",
                country: "string",
                is_active: true,
            },
        });
    } else {
        const data = userControllers.editUser(id, user, req.user.rol);
        return res.status(200).json({
            message: `User data edited succesfully`,
            user: data,
        });
    }
};

const remove = (req, res) => {
    const id = req.params.id;
    userControllers.deleteUser(id).then(response => {
        if (response) {
            res.status(204).json(); //? 204 no permite retornar algo, el json nos permite indicar que alli termina la respuesta.
        } else {
            res.status(400).json({ message: "Invalid ID" });
        }
    });
};

const getMyUser = (req, res) => {
    const id = req.user.id;
    console.log(id);
    userControllers
        .getUserById(id)
        .then(response => {
            res.status(200).json(response);
        })
        .catch(err => {
            res.status(404).json({ message: `User with ID ${id} not found` });
        });
};

const editMyUser = (req, res) => {
    const id = req.user.id;
    const user = req.body;

    if (!Object.keys(user).length) {
        return res.status(400).json({ message: "Missing data" });
    } else if (
        !user.first_name ||
        !user.last_name ||
        !user.email ||
        !user.phone ||
        !user.profile_image ||
        !user.birthday_date ||
        !user.country ||
        !user.is_active
    ) {
        return res.status(400).json({
            message: "All fields must be completed",
            fields: {
                first_name: "string",
                last_name: "string",
                email: "example@example.com",
                phone: "+51646461616",
                profile_image: "exampli.com/img/example.png",
                birthday_date: "DD/MM/YYYY",
                country: "string",
                is_active: true,
            },
        });
    } else {
        const data = userControllers.editUser(id, user);
        return res.status(200).json({
            message: `User data edited succesfully`,
            user: data,
        });
    }
};

const removeMyUser = (req, res) => {
    const id = req.user.id;
    const data = userControllers.deleteUser(id);
    return data
        ? res.status(204).json() //? 204 no permite retornar algo, el json nos permite indicar que alli termina la respuesta.
        : res.status(400).json({ message: "Invalid Id" });
};

const postProfileImg = (req, res) => {
    const id = req.user.id;
    console.log(req.file);
    const imgPath =
        req.hostname + ":" + port + "/api/v1/uploads/" + req.file.filename;
    const data = userControllers.editProfileImg(id, imgPath);
    if (data) {
        return res.status(200).json(data);
    }
    return res.status(400).json({ message: "Wrong Id" });
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
};
