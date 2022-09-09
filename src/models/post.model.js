const { db, DataTypes } = require("../utils/database");

const Posts = db.define("posts", {
    id: {
        primaryKey: true,
        type: DataTypes.UUID,
        allowNull: false,
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    content: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    user_id: {
        type: DataTypes.UUID,
        allowNull: false,
    },
    status: {
        type: DataTypes.STRING,
        defaultValue: "active",
    },
});

module.exports = Posts;
