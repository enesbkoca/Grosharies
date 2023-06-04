import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import '../App.css';
import axios from 'axios';

function ShowItemDetails(props) {
    const [item, setItem] = useState({});

    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        axios
            .get(`http://localhost:5000/api/items/${id}`)
            .then((res) => {
                setItem(res.data);
            })
            .catch((err) => {
                console.log('Error from ShowItemDetails')
            });
    }, [id]);

    const onDeleteClick = (id) => {
        axios
            .delete(`http://localhost:5000/api/items/${id}`)
            .then((res) => {
                navigate('/');
            })
            .catch((err) => {
                console.log('Error from ShowItemDetails_deleteClick')
            });
    };

    const ItemItem = (
        <div>
          <table className='table table-hover table-dark'>
            <tbody>
              <tr>
                <th scope='row'>1</th>
                <td>Name</td>
                <td>{item.name}</td>
              </tr>
              <tr>
                <th scope='row'>2</th>
                <td>Shop</td>
                <td>{item.shop}</td>
              </tr>
              <tr>
                <th scope='row'>3</th>
                <td>Is fulfilled</td>
                <td>{item.fulfilled}</td>
              </tr>
              <tr>
                <th scope='row'>4</th>
                <td>Quantity</td>
                <td>{item.quantity}</td>
              </tr>
              <tr>
                <th scope='row'>5</th>
                <td>Date Fulfilled</td>
                <td>{item.date_fulfilled}</td>
              </tr>
              <tr>
                <th scope='row'>6</th>
                <td>Date Added</td>
                <td>{item.date_added}</td>
              </tr>
            </tbody>
          </table>
        </div>
      );
    
      return (
        <div className='ShowItemDetails'>
          <div className='container'>
            <div className='row'>
              <div className='col-md-10 m-auto'>
                <br /> <br />
                <Link to='/' className='btn btn-outline-warning float-left'>
                  Show Item List
                </Link>
              </div>
              <br />
              <div className='col-md-8 m-auto'>
                <h1 className='display-4 text-center'>Item's Record</h1>
                <p className='lead text-center'>View Item's Info</p>
                <hr /> <br />
              </div>
              <div className='col-md-10 m-auto'>{ItemItem}</div>
              <div className='col-md-6 m-auto'>
                <button
                  type='button'
                  className='btn btn-outline-danger btn-lg btn-block'
                  onClick={() => {
                    onDeleteClick(item._id);
                  }}
                >
                  Delete Item
                </button>
              </div>
              <div className='col-md-6 m-auto'>
                <Link
                  to={`/edit-item/${item._id}`}
                  className='btn btn-outline-info btn-lg btn-block'
                >
                  Edit Item
                </Link>
              </div>
            </div>
          </div>
        </div>
      );
    }
    
export default ShowItemDetails;