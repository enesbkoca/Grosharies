import { useState } from 'react'; 



function FilterableItemTable({items}) {
  const [filterShop, setFilterShop] = useState('');
  const [unpurchasedOnly, setUnpurchasedOnly] = useState(true);


  return (
    <div>
      <SearchBar 
        filterShop={filterShop}
        unpurchasedOnly={unpurchasedOnly}
        onFilterShopChange={setFilterShop}
        onUnPurhcasedOnlyChange={setUnpurchasedOnly}/>
      <ItemTable 
        items={items}
        filterShop={filterShop}
        unpurchasedOnly={unpurchasedOnly}
        />
    </div>
  );
}

function SearchBar({ filterShop, unpurchasedOnly, onFilterShopChange, onUnPurhcasedOnlyChange }) {
  const shopList = []
  
  ITEMS.forEach((item) => {
      if (!(shopList.includes(item.shop))) {
        shopList.push(item.shop)
      }});
    
  const shopListOption = shopList.map((shop) => {
    return (
    <option 
      value={shop} 
      key={shop}>
      {shop}
    </option>
      )});

  return (
    <form>
      <select 
        name="shops" 
        id="shops"
        onChange={(e) => onFilterShopChange(e.target.value)}>
          {shopListOption}
      </select>

      <label>
        <input 
        type="checkbox"
        checked={unpurchasedOnly}
        onChange={(e) => {onUnPurhcasedOnlyChange(e.target.checked)}}/>
        {'Only unpurchased'}
      </label>
    </form>
  );
}

function ItemTable({items, filterShop, unpurchasedOnly}) {
  const rows = [];
  
  rows.push(
    <ItemCategoryRow
      shop={filterShop}
      key={filterShop} />
  );

  items.forEach((item) => {
    if (item.shop !== filterShop) {
        return;
      }

    if ((!(unpurchasedOnly)) || (unpurchasedOnly && (item.fulfilled === false))) {
    rows.push(
      <ItemRow
        item={item}
        key={item.name} />
      );
    }
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