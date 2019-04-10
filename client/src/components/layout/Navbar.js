import React, { Component } from "react";
import { Link } from "react-router-dom";
import { logoutUser } from "../../actions/authActions";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";

class Navbar extends Component {
  onLogoutClick() {
    this.props.auth.logoutUser();
  }

  render() {
    const styles = {
      style: "margin-bottom: 0"
    };

    return (
      <nav className="navbar navbar-default navbar-static-top" style={styles}>
        <div className="navbar-header">
          <button
            type="button"
            className="navbar-toggle"
            data-toggle="collapse"
            data-target=".navbar-collapse"
          >
            <span className="sr-only">Toggle navigation</span>
            <span className="icon-bar" />
            <span className="icon-bar" />
            <span className="icon-bar" />
          </button>
          <a className="navbar-brand">Priscilla's Cleaning Services</a>
        </div>

        <ul className="nav navbar-top-links navbar-right">
          <li className="dropdown">
            <a className="dropdown-toggle" data-toggle="dropdown">
              <i className="fa fa-user fa-fw" />{" "}
              <i className="fa fa-caret-down" />
            </a>
            <ul className="dropdown-menu dropdown-user">
              <li>
                <a>
                  <i className="fa fa-user fa-fw" /> {this.props.auth.user.name}
                </a>
              </li>
              <li>
                <a>
                  <i className="fa fa-gear fa-fw" /> Settings
                </a>
              </li>
              <li className="divider" />
              <li>
                <a href="" onClick={this.onLogoutClick.bind(this)}>
                  <i className="fa fa-sign-out fa-fw" /> Logout
                </a>
              </li>
            </ul>
          </li>
        </ul>

        <div className="navbar-default sidebar" role="navigation">
          <div className="sidebar-nav navbar-collapse">
            <ul className="nav" id="side-menu">
              <li className="sidebar-search">
                <div className="input-group custom-search-form">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Search..."
                  />
                  <span className="input-group-btn">
                    <button className="btn btn-default" type="button">
                      <i className="fa fa-search" />
                    </button>
                  </span>
                </div>
              </li>
              <li>
                <Link to="/">
                  <i className="fa fa-dashboard fa-fw" /> Dashboard
                </Link>
              </li>
              <li>
                <Link to="/clients">
                  <i className="glyphicon glyphicon-briefcase" /> Clients
                </Link>
              </li>
              <li>
                <Link to="/staff">
                  <i className="glyphicon glyphicon-user" /> Staff
                </Link>
              </li>
              <li>
                <Link to="/">
                  <i className="glyphicon glyphicon-time" /> Appoinments
                </Link>
              </li>
              <li>
                <a href="#">
                  <i class="glyphicon glyphicon-plus" /> New
                  <span class="fa arrow" />
                </a>
                <ul class="nav nav-second-level">
                  <li>
                    <Link to="/create-client">Client</Link>
                  </li>
                  <li>
                    <Link to="/create-staff">Staff</Link>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}

Navbar.propTypes = {
  logoutUser: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logoutUser }
)(Navbar);
