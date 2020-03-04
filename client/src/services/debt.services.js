import axios from 'axios'

export default class Services {

    constructor() {
        this.service = axios.create({
            baseURL: 'http://localhost:4000/api/debts',
            withCredentials: true
        })
    }

    getAllDebts = (id) => this.service.get(`/${id}/getAllDebts`).then(response => response.data)
    // getAllDebts= user_id => this.service.get(`${user_id}/getAllDebts`).then(response => response.data)

    getDebtDetails = id => this.service.get(`/getOneDebt/${id}`).then(response => response.data)
    postDebt = debt => this.service.post(`/new`, debt).then(response => response.data)
}