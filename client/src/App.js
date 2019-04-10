import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";

import PrivateRoute from "./components/common/PrivateRoute";

import "./App.css";

import setAuthToken from "./utils/setAuthToken";
import jwt_decode from "jwt-decode";
import Auth from "./utils/Auth";

// Components import
import Login from "./components/user/auth/Login";
import Register from "./components/user/auth/Register";
import Dashboard from "./components/dashboard/Dashboard";
import CreateClient from "./components/clients/CreateClient";
import CreateStaff from "./components/staff/CreateStaff";
import EditClient from "./components/clients/EditClient";
import Clients from "./components/clients/Clients";
import Staff from "./components/staff/Staff";
import EditStaff from "./components/staff/EditStaff";

// if (localStorage.jwtToken) {
//   setAuthToken(localStorage.jwtToken);

//   const decoded = jwt_decode(localStorage.jwtToken);

//   const currentTime = Date.now() / 1000;

//   if (decoded.exp < currentTime) {
//     Auth.deauthenticateUser();
//     window.location.href = "/login";
//   }
// }

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Switch>
              <Route exact path="/register" component={Register} />
            </Switch>
            <Switch>
              <Route exact path="/login" component={Login} />
            </Switch>
            <Switch>
              <PrivateRoute exact path="/" component={Dashboard} />
            </Switch>
            <Switch>
              <PrivateRoute
                exact
                path="/create-client"
                component={CreateClient}
              />
            </Switch>
            <Switch>
              <PrivateRoute exact path="/clients" component={Clients} />
            </Switch>
            <Switch>
              <PrivateRoute exact path="/clients/:id" component={EditClient} />
            </Switch>
            <Switch>
              <PrivateRoute
                exact
                path="/create-staff"
                component={CreateStaff}
              />
            </Switch>
            <Switch>
              <PrivateRoute exact path="/staff" component={Staff} />
            </Switch>
            <Switch>
              <PrivateRoute exact path="/staff/:id" component={EditStaff} />
            </Switch>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
