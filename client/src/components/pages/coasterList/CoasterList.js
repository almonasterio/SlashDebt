import React, { Component } from 'react'

import CoastersServices from '../../../services/coaster.services'

import CoasterForm from '../coasterForm/CoasterForm'
import CoasterCard from './CoasterCard'

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'

class CoastersList extends Component {

    constructor(props) {
        super(props)
        this.state = {
            coasters: [],
            showmodal: false
        }
        this.services = new CoastersServices()
    }

    componentDidMount = () => this.getAllCoasters()

    getAllCoasters = () => {
        this.services.getAllCoasters()
            .then(allCoasters => this.setState({ coasters: allCoasters }))
            .catch(err => console.log(err))
    }

    closeModal = () => this.setState({ showmodal: false })
    openModal = () => this.setState({ showmodal: true })

    render() {

        return (
            <Container>

                <h1>Montañas rusas</h1>

                {this.props.loggedInUser && <Button className="mb-20" variant="dark" onClick={this.openModal}>Crear Montaña rusa</Button>}

                {this.state.coasters.length ? (
                    <Row>
                        {this.state.coasters.map(elm => <CoasterCard key={elm._id} {...elm} />)}
                    </Row>
                )
                    :
                    <p>CARGANDO...</p>

                }






                <Modal show={this.state.showmodal} onHide={this.closeModal}>
                    <Modal.Body>
                        <h3>Nueva montaña rusa</h3>
                        <hr></hr>
                        <CoasterForm closeModal={this.closeModal} refreshList={this.getAllCoasters} />
                    </Modal.Body>
                </Modal>

            </Container>
        )
    }
}

export default CoastersList