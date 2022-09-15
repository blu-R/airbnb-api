const Role = require("../models/roles.model");

const roleAdminMiddleware = (req, res, next) => {
    Role.findOne({
        where: {
            name: "admin",
        },
    })
        //? select * from roles where name = 'admin'
        .then(response => {
            const role = req.user.role;

            if (role === response.id) {
                next();
            } else {
                res.status(401).json({
                    status: "error",
                    message: "User not authorized to make this request",
                });
            }
        })
        .catch(() =>
            res.status(401).json({
                status: "error",
                message: "User not authorized to make this request",
            })
        );

    /*  const role = req.user.role;
    if (role === "admin") {
        next();
    } else {
        return res
            .status(401)
            .json({ status: "error", message: "User not authorized" });
    } */
};

const roleHostMiddleware = (req, res, next) => {
    Role.findOne({
        where: {
            name: "host",
        },
    })
        .then(response => {
            const role = req.user.role;

            if (role === response.id) {
                next();
            } else {
                res.status(401).json({
                    status: "error",
                    message: "User not authorized to make this request",
                });
            }
        })
        .catch(() =>
            res.status(401).json({
                status: "error",
                message: "User not authorized to make this request",
            })
        );
};

const roleNotGuestMiddleware = (req, res, next) => {
    Role.findOne({
        where: {
            name: "guest",
        },
    })
        .then(response => {
            const role = req.user.role;

            if (role !== response.id) {
                next();
            } else {
                res.status(401).json({
                    status: "error",
                    message: "User not authorized to make this request",
                });
            }
        })
        .catch(() =>
            res.status(401).json({
                status: "error",
                message: "User not authorized to make this request",
            })
        );
};
module.exports = {
    roleAdminMiddleware,
    roleHostMiddleware,
    roleNotGuestMiddleware,
};
