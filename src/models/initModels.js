const Users = require("./users.model");
const User_images = require("./user_images.model");
const Roles = require("./roles.model");
const Reservations = require("./reservations.model");
const Accommodations = require("./accommodations.model");
const AccommodationImages = require("./accommodation_images.model");
const Places = require("./places.model");

const initModels = () => {
    //? Users <- Roles
    Roles.hasMany(Users, { foreignKey: "roleID" });
    // Roles.hasMany(Users);
    Users.belongsTo(Roles, { foreignKey: "roleID" });

    //? Users -> Users_images
    Users.hasMany(User_images);
    User_images.belongsTo(Users);

    //? Users <-> Accommodations
    Users.belongsToMany(Accommodations, { through: Reservations });
    Accommodations.belongsToMany(Users, { through: Reservations });

    //? Accommodations ->  Accommodation_images
    Accommodations.hasMany(AccommodationImages);
    AccommodationImages.belongsTo(Accommodations);

    //? Accommodations  <-  Places
    Accommodations.belongsTo(Places);
    Places.hasMany(Accommodations);

    //? User -> Acommodations (Host)
    Users.hasMany(Accommodations);
    Accommodations.belongsTo(Users);

    //?belongsTo
    //?belongsToMany
    //?hasOne
    //?hasMany
};

//exports.default = initModels;

module.exports = initModels;
