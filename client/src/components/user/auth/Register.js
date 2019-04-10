import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";

import "./user.css";
import Auth from "../../../utils/Auth";
import AuthFieldGroup from "../../common/AuthFieldGroup";
import { registerUser } from "../../../actions/authActions";

class Register extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      email: "",
      password: "",
      password2: "",
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillMount() {
    document.body.style.backgroundColor = "#34515e";
  }

  componentWillUnmount() {
    document.body.style.backgroundColor = null;
  }

  componentDidMount() {
    if (Auth.isUserAuthenticated()) {
      this.props.history.push("/");
    }
  }

  componentWillReceiveProps(nextProps) {
    // this runs when component receives new properties
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();

    const newUser = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2
    };

    this.props.registerUser(newUser, this.props.history);
  }

  render() {
    const { errors } = this.state;

    return (
      <div className="container-fluid">
        <form noValidate onSubmit={this.onSubmit} className="register-form">
          <div className="panel-title text-center">
            <h2 className="title">Register</h2>
            <hr />
          </div>
          <AuthFieldGroup
            name="name"
            type="text"
            label="Name"
            value={this.state.name}
            onChange={this.onChange}
            error={errors.name}
          />

          <AuthFieldGroup
            name="email"
            type="text"
            label="Email"
            value={this.state.email}
            onChange={this.onChange}
            error={errors.email}
          />

          <AuthFieldGroup
            name="password"
            type="password"
            label="Password"
            value={this.state.password}
            onChange={this.onChange}
            error={errors.password}
          />

          <AuthFieldGroup
            name="password2"
            type="password"
            label="Confirm Password"
            value={this.state.password2}
            onChange={this.onChange}
            error={errors.password2}
          />
          <hr />
          <div className="row">
            <div className="col-md-12">
              <button type="submit" className="btn btn-default regbutton">
                Register
              </button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

// This function allows the component to access the auth states
const mapStateToProps = state => ({
  auth: state.auth, // state.auth is coming from the auth key in the root reducer (index.js)
  errors: state.errors
});

// withRouter() is needed for redirection from within an action | within components use this.props.history.push('/')
export default connect(
  mapStateToProps, // connect the mapping of the reducer state to the component properties
  { registerUser } // object to map all actions of this component
)(withRouter(Register));
