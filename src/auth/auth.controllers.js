const { getUserByEmail } = require("../users/users.controllers");
const { comparePassword } = require("../utils/crypt");

const loginUser = async (email, password) => {
    const data = await getUserByEmail(email)
        .then(response => {
            //console.log(response[0]);
            if (response) {
                const verify_password = comparePassword(
                    password,
                    response.password
                );
                //console.log(verify_password);
                if (verify_password) {
                    //console.log(response[0].dataValues);
                    return response;
                }
            } else {
                return false;
            }
        })
        .catch(err => {
            console.log(err);
            return false;
        });
    //console.log(data);
    return data;
};

// console.log(loginUser("corco.bain@acme.com", "corcoPass"));

module.exports = {
    loginUser,
};
