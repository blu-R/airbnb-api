const Accommodation_images = require("../models/accommodation_images.model");
const Accommodations = require("../models/accommodations.model");
const Places = require("../models/places.model");
const Reservations = require("../models/reservations.model");
const Users = require("../models/users.model");
const Users_images = require("../models/user_images.model");
const Roles = require("../models/roles.model");

const uuid = require("uuid");

const generateData = async () => {
    // await Accommodations.sync({force: true})
    // await Places.sync({force: true})
    // await Roles.sync({force: true})
    // await Users.sync({force: true})

    await Roles.bulkCreate(
        [
            { name: "guest", id: "203cffb1-c847-49fd-88ab-97f1ca99ce16" },
            { name: "host", id: "fb250852-b6d8-499c-b970-4cde9f73dda6" },
            { name: "admin", id: "e3ec98b6-d116-44e6-9e19-a4c5300b0675" },
        ],
        { validate: true }
    );
    await Users.create({
        id: "774495ba-483b-49c4-b17c-a0a1bfa3796f",
        firstName: "Corco",
        lastName: "Bain",
        gender: "male",
        email: "corco.bain@acme.com",
        password:
            "$2b$10$.8kQe57PufXmZLeuJOeHSeT2mW58qDwK.cFZUECLPW/DZ8QMq1HXi",
        phone: "+51964325429",
        birthdayDate: "1999-11-02",
        roleID: "e3ec98b6-d116-44e6-9e19-a4c5300b0675",
        profileImage: "acme.com",
        status: "active",
        verified: false,
    });
    /* await Places.bulkCreate([
        {
            id: "864ee3c2-facd-4a23-8b4a-4e9d342d9036",
            city: "Guadalajara",
            state: "Jalisco",
            country: "México",
            continent: "America",
        },
        {
            id: "9c0412b6-7d56-4347-8fbe-5455e8a42438",
            city: "Zapopan",
            state: "Jalisco",
            country: "México",
            continent: "America",
        },
        {
            id: "3436a556-6623-40ba-88b8-2e01009f9d82",
            city: "Suba",
            state: "Bogotá",
            country: "Colombia",
            continent: "America",
        },
        {
            id: "134a55b6-487c-46cc-a5b5-9392af20c205",
            city: "Medellín",
            state: "Antioquia",
            country: "Colombia",
            continent: "America",
        },
        {
            id: "3a230417-80ae-4232-a8ff-6fd50068a777",
            city: "Azcapotzalco",
            state: "CDMX",
            country: "México",
            continent: "America",
        },
        {
            id: "0d907427-7623-4ec9-8c6d-270bb92fbbe7",
            city: "Monterrey",
            state: "Muevo León",
            country: "México",
            continent: "America",
        },
    ]); */
    // await Accommodations.create({
    //   id: "7e5fc196-8f45-46d2-bb2b-2f8b95340d50",
    //   title: "premium - vistas 360 ciudad (alberca y gym)",
    //   description: "asd",
    //   guests: 6,
    //   rooms: 3,
    //   beds: 3,
    //   bathrooms: 4.5,
    //   price: 1536.00,
    //   hostId : '74cd6011-7e76-4d6d-b25b-1d6e4182ec2f',
    //   score: 0.00,
    //   placeId: '9c0412b6-7d56-4347-8fbe-5455e8a42438',
    //   commision: 150.00
    // })
};

module.exports = generateData;
