import React from "react";
import classnames from "classnames";
import PropTypes from "prop-types";
import Aux from "../../utils/Aux";

const SelectListGroup = ({ name, label, onChange, value, options, error }) => {
  const selectOptions = options.map(option => {
    return (
      <option key={option.label} value={option.value}>
        {" "}
        {option.label}
      </option>
    );
  });
  return (
    <Aux>
      <div class="form-group">
        {label && <label>{label}</label>}
        <select
          name={name}
          className={classnames("form-control", {
            "is-invalid": error
          })}
          value={value}
          onChange={onChange}
        >
          {selectOptions}
        </select>
      </div>
    </Aux>
  );
};

SelectListGroup.propTypes = {
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  options: PropTypes.array.isRequired,
  error: PropTypes.string
};

export default SelectListGroup;
