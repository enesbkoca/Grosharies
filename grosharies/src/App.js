import React, { useState, useEffect } from 'react';

const App = () => {

    const [items, setItems] = useState([{id: 4, name: "Apple"}]);

    useEffect(() => {
      fetch('http://localhost:5000/api/items')
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setItems(data)
        })
        .catch((err) => {
          console.log(err.message);
        })
    }, []);

    return (
      <div className="items-container">
        {items.map((item) => {
          return(
          <div className="item-card" key={item.id}>
            <h2 className="item-name">{item.name}</h2>
            </div>
            )
        })}
      </div>
  )
};

export default App;