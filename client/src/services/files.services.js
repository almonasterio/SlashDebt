import axios from 'axios'

export default class Services {

    constructor() {
        this.service = axios.create({
            baseURL: 'http://localhost:4000/api/files',
            withCredentials: true   // RUTAS PERSISTENTES
        })
    }

    handleUpload = theFile => this.service.post('/upload', theFile).then(response => response.data)
}