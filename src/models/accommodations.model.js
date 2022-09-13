const { db, DataTypes } = require("../utils/database");

const Accommodations = db.define("accommodations", {
    id: {
        primaryKey: true,
        type: DataTypes.UUID,
        allowNull: false,
    },
    title: { allowNull: false, type: DataTypes.STRING },
    description: { allowNull: false, type: DataTypes.TEXT },
    guests: { allowNull: false, type: DataTypes.INTEGER },
    rooms: { allowNull: false, type: DataTypes.INTEGER },
    beds: { allowNull: false, type: DataTypes.INTEGER },
    bathrooms: { allowNull: false, type: DataTypes.DECIMAL },
    price: { allowNull: false, type: DataTypes.FLOAT },
    userId: { allowNull: false, type: DataTypes.UUID, field: "host_id" },
    score: { allowNull: false, type: DataTypes.FLOAT },
    placeId: { allowNull: false, type: DataTypes.UUID, field: "place_id" },
    commision: { allowNull: false, type: DataTypes.FLOAT },
    isActive: {
        allowNull: false,
        type: DataTypes.BOOLEAN,
        defaultValue: true,
        field: "is_active",
    },
});

module.exports = Accommodations;
