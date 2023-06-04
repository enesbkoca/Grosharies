import React, { useState, useEffect } from 'react';
import '../App.css';
import axios from 'axios';
import { Link } from 'react-router-dom';
import ItemCard from './ItemCard';

function ShowItemList() {
    const [items, setItems] = useState([]);

    useEffect(() => {
        axios
            .get('https://localhost:5000/api/items')
            .then((res) => {
                setItems(res.data);
            })
            .catch((err => {
                console.log('Error from ShowItemList')
            }));

    }, []);

    const itemList = items.length === 0 ? 'there is no item record!' : items.map((item, k) => <ItemCard item={item} key={k} />);

    return (
        <div className='ShowItemList'>
          <div className='container'>
            <div className='row'>
              <div className='col-md-12'>
                <br />
                <h2 className='display-4 text-center'>Items List</h2>
              </div>
    
              <div className='col-md-11'>
                <Link
                  to='/create-item'
                  className='btn btn-outline-warning float-right'
                >
                  + Add New Item
                </Link>
                <br />
                <br />
                <hr />
              </div>
            </div>
    
            <div className='list'>{itemList}</div>
          </div>
        </div>
      );
};

export default ShowItemList;