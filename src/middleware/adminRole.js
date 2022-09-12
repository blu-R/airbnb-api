const roleAdminMiddleware = (req, res, next) => {
    const role = req.user.role;
    if (role === "admin") {
        next();
    } else {
        return res
            .status(401)
            .json({ status: "error", message: "User not authorized" });
    }
};

module.exports = {
    roleAdminMiddleware,
};
