import React, { Component } from 'react'

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'

import AuthServices from '../../../../services/auth.services'

class Signup extends Component {

    constructor(props) {
        super(props)
        this.state = {
            username: '',
            password: ''
        }
        this.services = new AuthServices()
    }

    handleChange = e => {
        let { name, value } = e.target
        this.setState({ [name]: value })
    }

    postUser = () => {
        this.services.signup(this.state)
            .then(theLoggedNewUser => {
                this.setState({ username: '', password: '' })
                this.props.setTheUser(theLoggedNewUser)
            })
            .catch(err => console.log({ err }))
    }

    handleSubmit = e => {
        e.preventDefault()
        this.postUser()
    }


    render() {

        return (

            <Container>

                <h1>Registro de usuarios</h1>

                <Form onSubmit={this.handleSubmit}>
                    <Form.Group>
                        <Form.Label>Usuario</Form.Label>
                        <Form.Control type="text" name="username" value={this.state.username} onChange={this.handleChange} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Contraseña</Form.Label>
                        <Form.Control type="password" name="password" value={this.state.password} onChange={this.handleChange} />
                    </Form.Group>

                    <Button variant="dark" type="submit">Registrarse</Button>
                </Form>
            </Container>

        )
    }
}

export default Signup