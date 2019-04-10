const validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateStaffInput(data) {
  let errors = {};

  data.name = !isEmpty(data.name) ? data.name : "";
  data.phone = !isEmpty(data.phone) ? data.phone : "";

  if (validator.isEmpty(data.name)) {
    errors.name = "Staff name field is required";
  }

  if (validator.isEmpty(data.phone)) {
    errors.phone = "Staff phone field is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
