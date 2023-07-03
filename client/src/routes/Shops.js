import {getShops, removeShop, addShop} from '../api/calls'
import React, {useState, useEffect} from 'react';


export default function Shops() {
  const [shops, setShops] = useState([]);

  // Fetch the list of shops
  useEffect(() => {
    getShops()
      .then((data) => {
        setShops(data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  const handleDeleteShop = (shopID) => {
    // Delete the shop
    removeShop(shopID)
    .then((res) => {
        console.log(shopID);
        // Remove the deleted shop from the list
        setShops((prevShops) => prevShops.filter((shop) => shop._id !== shopID));
    })
    .catch((err) => {
        console.log(err.message);
    });
  };

  const handleAddShop = () => {
    // Prompt for the new shop name using an input element
    const newShopName = prompt('Enter the name of the new shop:');
    if (newShopName) {
      // Add the new shop
      addShop(newShopName)
        .then((res) => {
          // Add the new shop to the list
          setShops((prevShops) => [
            ...prevShops,
            { _id: res._id, name: newShopName },
          ]);
        })
        .catch((err) => {
          console.log(err.message);
        });
    }
  };

  return (
    <div>
      <h1>Shops</h1>
      <ul>
        {shops.map((shop) => (
          <li key={shop._id}>
            {shop.name}
            <button onClick={() => handleDeleteShop(shop._id)}>Delete</button>
          </li>
        ))}
      </ul>
      <button onClick={handleAddShop}>Add Shop</button>
    </div>
  );
}
