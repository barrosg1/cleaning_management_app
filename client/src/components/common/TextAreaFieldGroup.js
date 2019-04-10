import React from "react";
import classnames from "classnames";
import PropTypes from "prop-types";
import Aux from "../../utils/Aux";

const TextAreaFieldGroup = ({ name, label, onChange, value, error }) => {
  return (
    <Aux>
      <div class="form-group">
        {label && <label>{label}</label>}
        <textarea
          class="form-control"
          rows="3"
          name={name}
          className={classnames("form-control", {
            "is-invalid": error
          })}
          value={value}
          onChange={onChange}
        />
      </div>
      {error && <div className="invalid-feedback">{error}</div>}
    </Aux>
  );
};

TextAreaFieldGroup.propTypes = {
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  error: PropTypes.string
};

export default TextAreaFieldGroup;
