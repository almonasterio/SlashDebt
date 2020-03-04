import React, { Component } from 'react'

import DebtServices from '../../../services/debt.services'

import { Doughnut } from "react-chartjs-2";
import { Line } from "react-chartjs-2";

// import CoasterForm from '../coasterForm/CoasterForm'
// import CoasterCard from './CoasterCard'

// import Container from 'react-bootstrap/Container'
// import Row from 'react-bootstrap/Row'
// import Button from 'react-bootstrap/Button'
// import Modal from 'react-bootstrap/Modal'

class DebtList extends Component {

    constructor(props) {
        super(props)
        this.state = {
            coasters: [],
            showmodal: false
        }
        this.services = new DebtServices()
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
            <h1>All Debts</h1>
            <Doughnut data={data}></Doughnut>
            <Line data={data2}></Line>

            {this.props.loggedInUser && (
              <Button className="mb-20" variant="dark" onClick={this.openModal}>
                Crear Montaña rusa
              </Button>
            )}

            {this.state.coasters.length ? (
              <Row>
                {this.state.coasters.map(elm => (
                  <CoasterCard key={elm._id} {...elm} />
                ))}
              </Row>
            ) : (
              <p>CARGANDO...</p>
            )}

            <Modal show={this.state.showmodal} onHide={this.closeModal}>
              <Modal.Body>
                <h3>Nueva montaña rusa</h3>
                <hr></hr>
                <CoasterForm
                  closeModal={this.closeModal}
                  refreshList={this.getAllCoasters}
                />
              </Modal.Body>
            </Modal>
          </Container>
        );
    }
}

export default CoastersList