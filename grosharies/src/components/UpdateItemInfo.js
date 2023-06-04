import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../App.css';

function UpdateItemInfo(props) {
    const [item, setItem] = useState({
        name: '',
        fulfilled: '',
        shop: '',
        added_date: '',
        fulfilled_date: '',
        quantity: ''
    })

    const { id } = useParams();
    const navigate = useNavigate();
  
    useEffect(() => {
      axios
        .get(`http://localhost:5000/api/items/${id}`)
        .then((res) => {
          setItem({
            name: res.data.name,
            fulfilled: res.data.fulfilled,
            shop: res.data.shop,
            added_date: res.data.added_date,
            fulfilled_date: res.data.fulfilled_date,
            quantity: res.data.quantity,
          });
        })
        .catch((err) => {
          console.log('Error from UpdateItemInfo');
        });
    }, [id]);

    const onChange = (e) => {
        setItem({ ...item, [e.target.name]: e.target.value });
      };
    
      const onSubmit = (e) => {
        e.preventDefault();
    
        const data = {
            name: item.name,
            fulfilled: item.fulfilled,
            shop: item.shop,
            added_date: item.added_date,
            fulfilled_date: item.fulfilled_date,
            quantity: item.quantity,
        };
    
        axios
          .put(`http://localhost:8082/api/items/${id}`, data)
          .then((res) => {
            navigate(`/show-item/${id}`);
          })
          .catch((err) => {
            console.log('Error in UpdateItemInfo!');
          });
      };

    return (
    <div className='UpdateItemInfo'>
        <div className='container'>
        <div className='row'>
            <div className='col-md-8 m-auto'>
            <br />
            <Link to='/' className='btn btn-outline-warning float-left'>
                Show Item List
            </Link>
            </div>
            <div className='col-md-8 m-auto'>
            <h1 className='display-4 text-center'>Edit Items</h1>
            <p className='lead text-center'>Update Item's Info</p>
            </div>
        </div>

        <div className='col-md-8 m-auto'>
            <form noValidate onSubmit={onSubmit}>
            <div className='form-group'>
                <label htmlFor='name'>Name</label>
                <input
                type='text'
                placeholder='Name of item'
                name='name'
                className='form-control'
                value={item.name}
                onChange={onChange}
                />
            </div>
            <br />

            <div className='form-group'>
                <label htmlFor='fulfilled'>Is fulfilled</label>
                <input
                type='text'
                placeholder='Is fulfilled'
                name='fulfilled'
                className='form-control'
                value={item.fulfilled}
                onChange={onChange}
                />
            </div>
            <br />

            <div className='form-group'>
                <label htmlFor='shop'>Shop</label>
                <input
                type='text'
                placeholder='shop'
                name='shop'
                className='form-control'
                value={item.shop}
                onChange={onChange}
                />
            </div>
            <br />

            <div className='form-group'>
                <label htmlFor='added_date'>Added Date</label>
                <textarea
                type='text'
                placeholder='Added Date'
                name='added_date'
                className='form-control'
                value={item.added_date}
                onChange={onChange}
                />
            </div>
            <br />

            <div className='form-group'>
                <label htmlFor='fulfilled_date'>Fulfilled Date</label>
                <input
                type='text'
                placeholder='Fulfilled Date'
                name='fulfilled_date'
                className='form-control'
                value={item.fulfilled_date}
                onChange={onChange}
                />
            </div>
            <br />

            <div className='form-group'>
                <label htmlFor='quantity'>Quantity</label>
                <input
                type='text'
                placeholder='Quantity'
                name='quantity'
                className='form-control'
                value={item.quantity}
                onChange={onChange}
                />
            </div>
            <br />

            <button
                type='submit'
                className='btn btn-outline-info btn-lg btn-block'
            >
                Update Item
            </button>
            </form>
        </div>
        </div>
    </div>
    );
}

export default UpdateItemInfo;