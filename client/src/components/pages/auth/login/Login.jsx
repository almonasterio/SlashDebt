import React, { Component } from "react";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import "./Login.scss";

import AuthServices from "../../../../services/auth.services";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "bob",
      password: "bob"
    };
    this.services = new AuthServices();
  }

  handleChange = e => {
    let { name, value } = e.target;
    this.setState({
      [name]: value
    });
  };

  postUser = () => {
    this.services
      .login(this.state)
      .then(theLoggedUser => {
        this.setState({
          username: "bob",
          password: "bob"
        });
        this.props.setTheUser(theLoggedUser);
        this.props.history.push("/allDebts");
       
      })
      .catch(err =>
        console.log({
          err
        })
      );
  };

  handleSubmit = e => {
    e.preventDefault();
    this.postUser();
  };

  render() {
    return (
      <Container className="container-div">
        <h1> Login </h1>
        <Form onSubmit={this.handleSubmit}>
          <Form.Group>
            <Form.Label> Username </Form.Label>{" "}
            <Form.Control
              type="text"
              name="username"
              value={this.state.username}
              onChange={this.handleChange}
            />{" "}
          </Form.Group>{" "}
          <Form.Group>
            <Form.Label> Password</Form.Label>{" "}
            <Form.Control
              type="password"
              name="password"
              value={this.state.password}
              onChange={this.handleChange}
            />{" "}
          </Form.Group>
          <Button className="button-login" variant="dark" type="submit">
            {" "}
            LogIn{" "}
          </Button>{" "}
        </Form>{" "}
      </Container>
    );
  }
}

export default Login;
