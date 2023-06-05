import { useState } from 'react'; 



function FilterableItemTable({items}) {
  const [filterShop, setFilterShop] = useState('');
  const [fulfilledOnly, setFulfilledonly] = useState(true);


  return (
    <div>
      <SearchBar 
        filterShop={filterShop}
        fulfilledOnly={fulfilledOnly}/>
      <ItemTable 
        items={items}
        filtersShop={filterShop}
        fulfilledOnly={fulfilledOnly}/>
    </div>
  );
}

function SearchBar() {
  return (
    <form>
      <input type="text" placeholder="Search..." />
      <label>
        <input type="checkbox" />
        {'Only show groceries not fulfilled'}
        
      </label>
    </form>
  );
}

function ItemTable({items}) {
  const rows = [];
  let lastShop = null;

  items.forEach((item) => {
    if (item.shop !== lastShop) {
      rows.push(
        <ItemCategoryRow
          shop={item.shop}
          key={item.shop} />
      );
    }
    rows.push(
      <ItemRow
        item={item}
        key={item.name} />
    );

    lastShop = item.shop;
  });

  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Quantity</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  );
}


function ItemCategoryRow({shop}) {
  return (
    <tr>
      <th colSpan="2">
        {shop}
      </th>
    </tr>
  );
}

function ItemRow({item}) {
  const name = !(item.fulfilled) ? item.name :  <span><s>{item.name}</s></span>;

  return (
    <tr>
      <td>{name}</td>
      <td>{item.quantity}</td>
    </tr>
  );
}


const ITEMS = [
  {'shop': 'Lidl', 'name': 'Milk', 'fulfilled': false, "quantity": 3},
  {'shop': 'Lidl', 'name': 'Yoghurt', 'fulfilled': true, "quantity": 1},
  {'shop': 'Dirk', 'name': 'Chips', 'fulfilled': false, "quantity": 5}
]

export default function App() {
  return <FilterableItemTable items={ITEMS} />;
}














































// import React, { useState, useEffect } from 'react';
//
//
// const App = () => {

//     const [items, setItems] = useState([{id: 4, name: "Apple"}]);

//     useEffect(() => {
//       fetch('http://localhost:5000/api/items')
//         .then((res) => res.json())
//         .then((data) => {
//           console.log(data);
//           setItems(data)
//         })
//         .catch((err) => {
//           console.log(err.message);
//         })
//     }, []);

//     return (
//       <div className="items-container">
//         {items.map((item) => {
//           return(
//           <div className="item-card" key={item.id}>
//             <h2 className="item-name">{item.name}</h2>
//             </div>
//             )
//         })}
//       </div>
//   )
// };
//
// export default App;