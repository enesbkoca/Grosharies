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

function getShops() {
    return fetch(`${API_URL}/shops`)
        .then((res) => res.json())
        .then((data) => {
            return (data)
        })
        .catch((err) => {
            console.log(err.message)
            throw err;
        })
}

function addShop(shop) {
    return fetch(`${API_URL}/shops`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify({name: shop})
    })
        .then(res => res.json())
        .then(res => {
            console.log(res)
            return res;})
}

function removeShop(shopID) {
    return fetch(`${API_URL}/shops/${shopID}`, {
        method: 'DELETE',
    })
        .then(res => res.json())
        .then(res => {
            console.log(res)
            return res;})
}


export {API_URL, getItems, crossItem, getShops, addShop, removeShop}