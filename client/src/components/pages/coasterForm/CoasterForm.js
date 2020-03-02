import React, { Component } from 'react'

import CoastersServices from '../../../services/coaster.services'

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

import FilesServices from '../../../services/files.services'

class CoasterForm extends Component {

    constructor(props) {
        super(props)
        this.coasterServices = new CoastersServices()
        this.filesServices = new FilesServices()
        this.state = {
            coaster: {
                title: '',
                description: '',
                length: '',
                inversions: '',
                imageUrl: ''
            }
        }
    }

    finishAction = () => {
        this.props.closeModal()
        this.props.refreshList()
    }

    postCoaster = () => {
        this.coasterServices.postCoaster(this.state.coaster)
            .then(() => this.finishAction())
            .catch(err => console.log(err))
    }

    handleChange = e => {
        let { name, value } = e.target
        this.setState({
            coaster: { ...this.state.coaster, [name]: value }
        })
    }

    handleSubmit = e => {
        e.preventDefault()
        this.postCoaster()
    }

    handleFileUpload = e => {
        const uploadData = new FormData()
        uploadData.append("imageUrl", e.target.files[0])
        this.filesServices.handleUpload(uploadData)
            .then(response => {
                console.log('Subida de archivo finalizada! La URL de Cloudinray es: ', response.secure_url)
                this.setState({
                    coaster: { ...this.state.coaster, imageUrl: response.secure_url }
                })
            })
            .catch(err => console.log(err))
    }

    render() {

        return (
            <Form onSubmit={this.handleSubmit}>
                <Form.Group>
                    <Form.Label>Nombre</Form.Label>
                    <Form.Control type="text" name="title" value={this.state.coaster.title} onChange={this.handleChange} />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Descripción</Form.Label>
                    <Form.Control type="text" name="description" value={this.state.coaster.description} onChange={this.handleChange} />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Longitud</Form.Label>
                    <Form.Control type="number" name="length" value={this.state.coaster.length} onChange={this.handleChange} />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Inversiones</Form.Label>
                    <Form.Control type="number" name="inversions" value={this.state.coaster.inversions} onChange={this.handleChange} />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Imagen</Form.Label>
                    <Form.Control type="file" name="imageUrl" onChange={this.handleFileUpload} />
                    {/* <Form.Control type="text" name="imageUrl" value={this.state.coaster.imageUrl} onChange={this.handleChange} /> */}
                </Form.Group>

                <Button variant="dark" type="submit">Crear nueva Montaña</Button>
            </Form>
        )
    }
}

export default CoasterForm