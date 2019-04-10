const validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateClientInput(data) {
  let errors = {};

  data.name = !isEmpty(data.name) ? data.name : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  data.phone = !isEmpty(data.phone) ? data.phone : "";

  if (!validator.isEmail(data.email)) {
    errors.email = "Email is invalid";
  }

  if (validator.isEmpty(data.email)) {
    errors.email = "Email field is required";
  }

  if (validator.isEmpty(data.name)) {
    errors.name = "Client name field is required";
  }

  if (validator.isEmpty(data.phone)) {
    errors.phone = "Client phone field is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
