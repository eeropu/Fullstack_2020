import axios from 'axios'
const baseURL = '/api/persons'

const getAll = () => {
    return axios.get(baseURL).then(response => response.data)
}

const create = (addable) => {
    return axios.post(baseURL, addable).then(response => response.data)
}

const remove = (id) => {
    return axios.delete(`${baseURL}/${id}`)
}

const update = (id, update) => {
    return axios.put(`${baseURL}/${id}`, update).then(response => response.data)
}

export default ({ getAll, create, remove, update })