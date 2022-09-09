const Users = require("./user.model");
const Posts = require("./post.model");

const initModels = () => {
    //? 1 Users -> Posts M
    Users.hasMany(Posts);
    Posts.belongsTo(Users);
};

module.exports = initModels;
// exports.default = initModels
