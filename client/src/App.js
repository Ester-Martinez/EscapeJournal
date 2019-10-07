import React, { Component } from "react";
import "./App.css";
import { Switch, Route, Redirect } from "react-router-dom";

import Navbar from "./components/navbar/Navbar";
import Signup from "./components/auth/Signup";
import Login from "./components/auth/Login";
import AuthService from "./components/auth/AuthService";
import Contents from "./components/contents/Contents";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { loggedInUser: null };
    this.service = new AuthService();

    this.fetchUser()
  }
  getUser = userObj => {
    this.setState({
      loggedInUser: userObj,
    });
  };
  fetchUser() {
    return this.service
      .loggedin()
      .then(response => {
        this.setState({
          loggedInUser: response,
        });
      })
      .catch(err => {
        this.setState({
          loggedInUser: false,
        });
      });
  }
  render ()  {
//aqui hacemos rendering condicional dependiendo de si tenemos un usuario logeado o no
if (this.state.loggedInUser) {
  //en este caso mostramos los contenidos ya que hay usuario
  return (
    <React.Fragment>
      <Redirect to="/home" />

      <div className="App">
        <header className="App-header">
          <Navbar userInSession={this.state.loggedInUser} logout={this.logout} />
          {/* aqui simplemente se muestra un lorem ipsum genérico para que veáis contenidos que solo se muestran a usuarios logeados */}
          <Contents />
        </header>
      </div>
    </React.Fragment>
  );
} else {
  //si no estás logeado, mostrar opcionalmente o login o signup
  return (
    <React.Fragment>
      <Redirect to="/login" />

      <div className="App">
        <header className="App-header">
          <Navbar userInSession={this.state.loggedInUser} logout={this.logout} />
          <Switch>
            <Route exact path="/signup" render={() => <Signup getUser={this.getUser} />} />
            <Route exact path="/login" render={() => <Login getUser={this.getUser} />} />
          </Switch>
        </header>
      </div>
    </React.Fragment>
  );
}
  }
 
}

export default App;
