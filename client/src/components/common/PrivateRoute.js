import React from "react";
import { Route, Redirect } from "react-router-dom";
import Auth from "../../utils/Auth";
import Aux from "../../utils/Aux";
import Navbar from "../layout/Navbar";

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      Auth.isUserAuthenticated() === true ? (
        <Aux>
          <Navbar />
          <Component {...props} />
        </Aux>
      ) : (
        <Redirect to="/login" />
      )
    }
  />
);

export default PrivateRoute;
