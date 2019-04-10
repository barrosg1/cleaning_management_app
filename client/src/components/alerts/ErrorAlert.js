import React from "react";
import Aux from "../../utils/Aux";
import isEmpty from "../../validation.js/is-empty";

const ErrorAlert = ({ errors }) => {
  let errorList = [];

  if (!isEmpty(errors)) {
    const errorsArray = Object.values(errors);
    errorList = errorsArray.map(error => {
      return (
        <Aux>
          <strong>Error: </strong>
          {error}
          <br />
        </Aux>
      );
    });
  }

  return (
    <div className="col-sm-12 alert alert-danger" role="alert">
      {errorList}
    </div>
  );
};

export default ErrorAlert;
