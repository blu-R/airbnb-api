const router = require("express").Router();
const passport = require("passport");
const {
    roleHostMiddleware,
    roleNotGuestMiddleware,
    roleAdminMiddleware,
} = require("../middleware/role.middleware");

const reservationServices = require("../reservations/reservations.http");
require("../middleware/auth.middleware")(passport);
const accommodationServices = require("./accommodations.http");

router
    .route("/")
    .get(accommodationServices.getAll)
    .post(
        passport.authenticate("jwt", { session: false }),
        roleHostMiddleware,
        accommodationServices.create
    );

router
    .route("/:id")
    .get(accommodationServices.getById)
    .put(
        passport.authenticate("jwt", { session: false }),
        roleAdminMiddleware,
        accommodationServices.edit
    )
    .delete(
        passport.authenticate("jwt", { session: false }),
        roleAdminMiddleware,
        accommodationServices.remove
    );

router
    .route("/:id/make-reservation")
    .post(
        passport.authenticate("jwt", { session: false }),
        reservationServices.postReservation
    );

module.exports = {
    router,
};
