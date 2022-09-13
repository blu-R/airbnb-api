const jwt = require("jsonwebtoken");
const { loginUser } = require("./auth.controllers");
const { jwt_secret } = require("../config");

const login = async (req, res) => {
    //const login = (req, res) => {
    const body = req.body;

    if (!body.email || !body.password) {
        return res.status(400).json({ message: "Missing data" });
    }

    const data = await loginUser(body.email, body.password);
    // const data = loginUser(body.email, body.password);
    /* .then(response => response)
        .catch(err => console.log(err)); */
    //console.log(data);
    if (data) {
        const token = jwt.sign(
            {
                id: data.id,
                email: data.email,
                role: data.roleID,
            },
            jwt_secret
        );
        return res.status(200).json({ message: "Loggin in", token });
    } else {
        return res.status(401).json({ message: "Invalid Credentials" });
    }
    //console.log(response);
};

module.exports = {
    login,
};
