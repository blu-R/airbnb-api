const { getUserByEmail } = require("../users/users.controllers");
const { comparePassword } = require("../utils/crypt");

const loginUser = async (email, password) => {
    /* return await getUserByEmail(email)
        .then(res => {
            const verify_password = comparePassword(password, res.password);
            if (verify_password) {
                return user;
            }
            return false;
        })
        .catch(err => false); */
    const data = await getUserByEmail(email)
        .then(response => {
            //console.log(response);
            if (response) {
                const verify_password = comparePassword(
                    password,
                    response.password
                );

                if (verify_password) {
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

module.exports = {
    loginUser,
};
