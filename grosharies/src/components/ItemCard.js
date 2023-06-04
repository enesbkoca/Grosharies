import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';

const ItemCard = (props) => {
    const item = props.item;

    return (
        <div className='card-container'>
          <img
            src='https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.wegmans.com%2Fgroceries-online%2F&psig=AOvVaw1Xl4DxqSqtCm5DpCNjAAvl&ust=1685969628825000&source=images&cd=vfe&ved=0CBEQjRxqFwoTCPjhw7jUqf8CFQAAAAAdAAAAABAJ'
            alt='Groceries'
            height={200}
          />
          <div className='desc'>
            <h2>
              <Link to={`/show-item/${item._id}`}>{item.name}</Link>
            </h2>
            <h3>{item.fulfilled}</h3>
          </div>
        </div>
      );

}

export default ItemCard;