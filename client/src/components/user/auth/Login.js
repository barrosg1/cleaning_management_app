import React, { Component } from "react";

import AuthFieldGroup from "../../common/AuthFieldGroup";
import { loginUser } from "../../../actions/authActions";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";

import "./user.css";

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
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
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/");
    }
  }

  onSubmit(e) {
    e.preventDefault();

    const user = {
      email: this.state.email,
      password: this.state.password
    };

    this.props.loginUser(user);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { errors } = this.state;
    return (
      <div className="container-fluid">
        <form noValidate onSubmit={this.onSubmit} className="register-form">
          <div className="panel-title text-center">
            <h2 className="title"> Login</h2>
            <hr />
          </div>

          <AuthFieldGroup
            name="email"
            label="Email"
            type="email"
            onChange={this.onChange}
            value={this.state.email}
            error={errors.email}
          />

          <AuthFieldGroup
            name="password"
            label="Password"
            type="password"
            onChange={this.onChange}
            value={this.state.password}
            error={errors.password}
          />

          <hr />
          <div className="row">
            <div className="col-md-12">
              <button type="submit" className="btn btn-default regbutton">
                Login
              </button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

Login.propTypes = {
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  loginUser: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { loginUser }
)(withRouter(Login));
