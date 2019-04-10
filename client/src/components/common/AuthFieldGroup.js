import React from "react";
import classnames from "classnames";
import PropTypes from "prop-types";
import Aux from "../../utils/Aux";

const AuthFieldGroup = ({ name, label, onChange, type, value, error }) => {
  return (
    <Aux>
      <div className="row">
        <div className="col-md-4 col-sm-4 col-lg-4">
          {label && <label htmlFor={name}>{label}</label>}
          <input
            name={name}
            className={classnames("form-control", {
              "is-invalid": error
            })}
            type={type}
            value={value}
            onChange={onChange}
          />
        </div>
      </div>
      {error && <div className="invalid-feedback">{error}</div>}
    </Aux>
  );
};

AuthFieldGroup.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  error: PropTypes.string
};

AuthFieldGroup.defaultProps = {
  type: "text"
};

export default AuthFieldGroup;
