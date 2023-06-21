// import { API_URL } from '../index'
const API_URL = "http://localhost:5005/api"

function getItems() {
    return fetch(`${API_URL}/items`)
        .then((res) => res.json())
        .then((data) => {
        return (data)
        })
        .catch((err) => {
            console.log(err.message)
            throw err;
            })
}

function crossItem(id, fulfilled) {
    return fetch(`${API_URL}/items/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fulfilled: (!(fulfilled))})})
            .then(res => res.json())
            .then(res => console.log(res))
}

export {API_URL, getItems, crossItem}