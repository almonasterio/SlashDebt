import React, { Component } from 'react'

import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import "./NavBar.scss"

import AuthServices from '../../services/auth.services'

import { Link } from 'react-router-dom'

class Navigation extends Component {

    constructor(props) {
        super(props)
        this.state = {}
        this.services = new AuthServices()
    }

    logout = () => {
        this.services.logout()
            .then(response => {
                this.props.setTheUser(false)
            })
            .catch(err => console.log(err))
    }


    render() {

        const greeting = this.props.loggedInUser && <>Welcome {this.props.loggedInUser.username}</>

        return this.props.loggedInUser ? (
          <Navbar className="navbar-main" expand="lg" variant="dark">
            <Navbar.Brand>SlashDebt</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="ml-auto">
                <Nav.Link as="div">
                  {" "}
                  <Link to="/" className="navbar-title">
                    Home
                  </Link>
                </Nav.Link>
                <Nav.Link as="div">
                  {" "}
                  <Link to="/allDebts" className="navbar-title">
                    allDebts
                  </Link>
                </Nav.Link>

                <Nav.Link onClick={this.logout}>Log out</Nav.Link>
                <Nav.Link className="navbar-title">{greeting}</Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Navbar>
        ) : (
          <Navbar className="navbar" expand="lg" variant="dark">
            <Navbar.Brand href="#home">SlashDebt</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="ml-auto">
                <Nav.Link as="div">
                  {" "}
                  <Link to="/" className="navbar-title">
                    Home
                  </Link>
                </Nav.Link>
                <Nav.Link className="navbar-title" as="div">
                  {" "}
                  <Link to="/signup" className="navbar-title">
                    Signup
                  </Link>
                </Nav.Link>
                <Nav.Link as="div">
                  {" "}
                  <Link to="/login" className="navbar-title">
                    Login
                  </Link>
                </Nav.Link>
                <Nav.Link as="small" className="navbar-title">
                  {greeting}
                </Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Navbar>
        );
    }
}

export default Navigation