const User = require("./users.model");
const User_image = require("./user_images.model");
const Role = require("./roles.model");
const Reservation = require("./reservations.model");
const Accommodation = require("./accommodations.model");
const AccommodationImage = require("./accommodation_images.model");
const Place = require("./places.model");

const initModels = () => {
    //? Users <- Roles
    Role.hasMany(User, { foreignKey: "roleID" });
    // Roles.hasMany(Users);
    User.belongsTo(Role, { foreignKey: "roleID" });

    //? Users -> Users_images
    User.hasMany(User_image);
    User_image.belongsTo(User);

    //? Users <-> Accommodations
    User.belongsToMany(Accommodation, { through: Reservation });
    Accommodation.belongsToMany(User, { through: Reservation });

    //? Accommodations ->  Accommodation_images
    Accommodation.hasMany(AccommodationImage);
    AccommodationImage.belongsTo(Accommodation);

    //? Accommodations  <-  Places
    Accommodation.belongsTo(Place);
    Place.hasMany(Accommodation);

    //? User -> Acommodations (Host)
    User.hasMany(Accommodation);
    Accommodation.belongsTo(User);

    //?belongsTo
    //?belongsToMany
    //?hasOne
    //?hasMany
};

//exports.default = initModels;

module.exports = initModels;
