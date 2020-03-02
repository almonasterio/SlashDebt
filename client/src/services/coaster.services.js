import axios from 'axios'

export default class Services {

    constructor() {
        this.service = axios.create({
            baseURL: 'http://localhost:4000/api/coasters',
            withCredentials: true
        })
    }

    getAllCoasters = () => this.service.get('/getAllCoasters').then(response => response.data)
    getCoasterDetails = id => this.service.get(`/getOneCoaster/${id}`).then(response => response.data)
    postCoaster = coaster => this.service.post(`/new`, coaster).then(response => response.data)
}