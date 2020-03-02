import React, { Component } from 'react'

import CoastersServices from '../../../services/coaster.services'

import './coaster-details.css'

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'

import { Link } from 'react-router-dom'

class CoasterDetails extends Component {

    constructor(props) {
        super(props)
        this.state = { coaster: {} }
        this.services = new CoastersServices()

        console.log('las props por defecto serían estas:', this.props)
    }

    componentDidMount = () => this.getCoasterDetails()

    getCoasterDetails = () => {
        this.services.getCoasterDetails(this.props.match.params.id)
            .then(theCoaster => this.setState({ coaster: theCoaster }))
            .catch(err => console.log(err))
    }

    render() {

        return (
            <Container className="coaster-details">
                <h1>{this.state.coaster.title}</h1>
                <Row>
                    <Col md={{ span: 4, offset: 1 }}>
                        <h3>Stats</h3>
                        <hr></hr>
                        <p>Descripción: {this.state.coaster.description}</p>
                        <p>Inversiones: {this.state.coaster.inversions}</p>
                        <p>Longitud: {this.state.coaster.length}</p>
                    </Col>
                    <Col md={{ span: 5, offset: 1 }}>
                        <img src={this.state.coaster.imageUrl} alt={this.state.coaster.title}></img>
                    </Col>
                </Row>
                <Button as="div" variant="dark" size="sm">
                    <Link to="/">Volver</Link>
                </Button>
            </Container>
        )
    }
}

export default CoasterDetails