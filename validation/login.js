const validate = require("validator");
const isEmpty = require("is-empty");

function validateLogin(data) {
    let error = {};

    data.password = isEmpty(data.password) ? "" : data.password;
    data.email = isEmpty(data.email) ? "" : data.email;

    if (validate.isEmpty(data.password)) {
        error.password = "Name cannot br empty";
    }
    if (validate.isEmpty(data.email)) {
        error.email = "Please Enter Your Email";
    } else if (!validate.isEmail(data.email)) {
        error.email = "Email is invalid";
    }

    return {
        error,
        isValid: isEmpty(error),
    };
}

module.exports = validateLogin;