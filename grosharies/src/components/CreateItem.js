import React, {useState} from 'react';
import { Link  } from 'react-router-dom';
import axios from 'axios'

import { useNavigate } from 'react-router-dom';


const CreateItem = (props) => {
    // Define the state with useState hook

    const navigate = useNavigate();
    const [item, setItem] = useState({
        name: '',
        fulfilled: '',
        shop: '',
        added_date: '',
        fulfilled_date: '',
        quantity: ''
    })

    const onChange = (e) => {
        setItem({...item, [e.target.name]: e.target.value})
    }

    const onSubmit = (e) => {
        e.preventDefault();

        axios
            .post('https://localhost:5000/api/items', item)
            .then((res) => {
                setItem({
                    name: '',
                    fulfilled: '',
                    shop: '',
                    added_date: '',
                    fulfilled_date: '',
                    quantity: ''
                });
                
                navigate('/');
            })
            .catch((err) => {
                console.log('Error in CreateItem!');
            });
    };

    return (
        <div className='CreateItem'>
          <div className='container'>
            <div className='row'>
              <div className='col-md-8 m-auto'>
                <br />
                <Link to='/' className='btn btn-outline-warning float-left'>
                  Show Item List
                </Link>
              </div>
              <div className='col-md-8 m-auto'>
                <h1 className='display-4 text-center'>Add Item</h1>
                <p className='lead text-center'>Create new Item</p>
    
                <form noValidate onSubmit={onSubmit}>
                  <div className='form-group'>
                    <input
                      type='text'
                      placeholder='Name of the Item'
                      name='name'
                      className='form-control'
                      value={item.name}
                      onChange={onChange}
                    />
                  </div>
                  <br />
    
                  <div className='form-group'>
                    <input
                      type='text'
                      placeholder='Item Not Fulfilled'
                      name='fulfilled'
                      className='form-control'
                      value={item.fulfilled}
                      onChange={onChange}
                    />
                  </div>
    
                  <div className='form-group'>
                    <input
                      type='text'
                      placeholder='Shop'
                      name='shop'
                      className='form-control'
                      value={item.shop}
                      onChange={onChange}
                    />
                  </div>
    
                  <div className='form-group'>
                    <input
                      type='text'
                      placeholder='Date item added'
                      name='added_date'
                      className='form-control'
                      value={item.added_date}
                      onChange={onChange}
                    />
                  </div>
    
                  <div className='form-group'>
                    <input
                      type='date'
                      placeholder='Date item fulfilled'
                      name='fulfilled_date'
                      className='form-control'
                      value={item.fulfilled_date}
                      onChange={onChange}
                    />
                  </div>
                  <div className='form-group'>
                    <input
                      type='text'
                      placeholder='Quantity of item'
                      name='quantity'
                      className='form-control'
                      value={item.quantity}
                      onChange={onChange}
                    />
                  </div>
    
                  <input
                    type='submit'
                    className='btn btn-outline-warning btn-block mt-4'
                  />
                </form>
              </div>
            </div>
          </div>
        </div>
      );
};

export default CreateItem;