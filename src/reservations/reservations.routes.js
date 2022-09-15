const router = require("express").Router();
const passport = require("passport");
const { roleAdminMiddleware } = require("../middleware/role.middleware");
const reservationServices = require("./reservations.http");

router.route("/").get(reservationServices.getAll);

router
    .route("/:id")
    .get(
        passport.authenticate("jwt", { session: false }),
        roleAdminMiddleware,
        reservationServices.update
    )
    .put(
        passport.authenticate("jwt", { session: false }),
        roleAdminMiddleware,
        reservationServices.update
    );

module.exports = {
    router,
};
