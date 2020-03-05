import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";

import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
//Import services for authentication
import AuthServices from "./services/auth.services";
//Import necessary ui components:
import NavBar from "./components/ui/NavBar.jsx"
//Import necessary components:

import Signup from "./components/pages/auth/signup/Signup.jsx";

import Login from "./components/pages/auth/login/Login.jsx";





class App extends Component {
  constructor() {
    super();
    this.state = {
      loggedInUser: false
    };
    this.loginServices = new AuthServices();
  }

  componentDidUpdate = (prevProps, prevState) =>
    console.log("El estado de App se ha actualizado:", this.state);
  componentDidMount = () => this.fetchUser();

  setTheUser = userObj =>
    this.setState({
      loggedInUser: userObj
    });
  fetchUser = () => {
    this.loginServices
      .loggedin()
      .then(theUser =>
        this.setState({
          loggedInUser: theUser
        })
      )
      .catch(() =>
        this.setState({
          loggedInUser: false
        })
      );
  };

  render() {
    return (
      <>
        <NavBar
          setTheUser={this.setTheUser}
          loggedInUser={this.state.loggedInUser}
        />
        <Switch>
          <Route
            exact
            path="/allDebts"
            render={() => <Signup setTheUser={this.setTheUser} />}
          />
          <Route
            path="/signup"
            render={() => <Signup setTheUser={this.setTheUser} />}
          />
          <Route
            path="/login"
            render={props => <Login setTheUser={this.setTheUser} {...props} />}
          />
        </Switch>
      </>
    );
  }
}
export default App;
