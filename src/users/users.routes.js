const router = require("express").Router();

const passport = require("passport");
const {
    roleAdminMiddleware,
    roleHostMiddleware,
} = require("../middleware/role.middleware");
const { upload } = require("../utils/multer");
require("../middleware/auth.middleware")(passport);

const userServices = require("./users.http");

router
    .route("/") //? /api/v1/users
    .get(userServices.getAll);

router
    .route("/me")
    .get(
        passport.authenticate("jwt", { session: false }),
        userServices.getMyUser
    )
    .put(
        passport.authenticate("jwt", { session: false }),
        userServices.editMyUser
    )
    .delete(
        passport.authenticate("jwt", { session: false }),
        userServices.removeMyUser
    );

router
    .route("/me/accommodations")
    .get(
        passport.authenticate("jwt", { session: false }),
        roleHostMiddleware,
        userServices.getMyAccommodations
    );

router
    .route("/me/accommodations/:id")
    .put(
        passport.authenticate("jwt", { session: false }),
        roleHostMiddleware,
        userServices.editMyAccomodation
    )
    .delete(
        passport.authenticate("jwt", { session: false }),
        roleHostMiddleware,
        userServices.removeMyAccommodation
    );

router
    .route("/me/profile-img")
    .post(
        passport.authenticate("jwt", { session: false }),
        upload.single("profile_img"),
        userServices.postProfileImg
    );

router
    .route("/:id")
    .get(userServices.getById)
    .put(
        passport.authenticate("jwt", { session: false }),
        roleAdminMiddleware,
        userServices.edit
    )
    .delete(
        passport.authenticate("jwt", { session: false }),
        roleAdminMiddleware,
        userServices.remove
    );

router.route("/:id/role").get(userServices.getUserRole);

exports.router = router;
