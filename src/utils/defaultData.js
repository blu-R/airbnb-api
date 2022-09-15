const Accommodation_images = require("../models/accommodation_images.model");
const Accommodation = require("../models/accommodations.model");
const Places = require("../models/places.model");
const Reservations = require("../models/reservations.model");
const Users = require("../models/users.model");
const Users_images = require("../models/user_images.model");
const Roles = require("../models/roles.model");

const uuid = require("uuid");

const generateData = async () => {
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
    await Places.bulkCreate([
        {
            id: "864ee3c2-facd-4a23-8b4a-4e9d342d9036",
            city: "Lima",
            state: "Lima",
            country: "Perú",
            continent: "America",
        },
        {
            id: "9c0412b6-7d56-4347-8fbe-5455e8a42438",
            city: "Huancayo",
            state: "Junín",
            country: "Perú",
            continent: "America",
        },
        {
            id: "3436a556-6623-40ba-88b8-2e01009f9d82",
            city: "Arequipa",
            state: "Arequipa",
            country: "Perú",
            continent: "America",
        },
        {
            id: "134a55b6-487c-46cc-a5b5-9392af20c205",
            city: "Chiclayo",
            state: "Lambayeque",
            country: "Perú",
            continent: "America",
        },
        {
            id: "3a230417-80ae-4232-a8ff-6fd50068a777",
            city: "Trujillo",
            state: "La Libertad",
            country: "Perú",
            continent: "America",
        },
        {
            id: "0d907427-7623-4ec9-8c6d-270bb92fbbe7",
            city: "Cuzco",
            state: "Cuzco",
            country: "Perú",
            continent: "America",
        },
        {
            id: "df065681-169f-411f-9254-83c3a70a8ba3",
            city: "Perugia",
            state: "Umbría",
            country: "Italia",
            continent: "Europa",
        },
    ]);
    await Accommodation.create({
        id: "7e5fc196-8f45-46d2-bb2b-2f8b95340d50",
        title: "premium - vistas 360 ciudad (piscina y gym)",
        description: "Lorem ipsum",
        guests: 6,
        rooms: 3,
        beds: 3,
        bathrooms: 4.5,
        price: 1536.0,
        userId: "774495ba-483b-49c4-b17c-a0a1bfa3796f",
        score: 0.0,
        placeId: "9c0412b6-7d56-4347-8fbe-5455e8a42438",
        commision: 150.0,
    });
};

module.exports = generateData;
