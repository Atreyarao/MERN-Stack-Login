const validate = require("validator");
const isEmpty = require("is-empty");

function registerValidator(data) {
    //console.log(data);
    const error = {};
    data.name = isEmpty(data.name) ? "" : data.name;
    data.email = isEmpty(data.email) ? "" : data.email;
    data.password1 = isEmpty(data.password1) ? "" : data.password1;
    data.password2 = isEmpty(data.password2) ? "" : data.password2;

    if (validate.isEmpty(data.name)) {
        error.name = "Name cannot be empty";
    }

    if (validate.isEmpty(data.email)) {
        error.email = "Email cannot be empty";
    } else if (!validate.isEmail(data.email)) {
        error.email = "Email is not valid";
    }
    if (validate.isEmpty(data.password1) || validate.isEmpty(data.password2)) {
        error.password = "Please fill both password feilds";
    } else if (!validate.equals(data.password1, data.password2)) {
        error.password = "Passwords do not match0;";
    } else if (!validate.isLength(data.password1, { min: 6, max: 30 })) {
        error.password = "Password must be between 6-30 letters";
    }

    return {
        error,
        isValid: isEmpty(error)
    };
}

module.exports = registerValidator;