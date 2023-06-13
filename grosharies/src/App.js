import { useState, useEffect } from 'react'; 
import './App.css';


function FilterableItemTable({items}) {
  const [filterShop, setFilterShop] = useState('All');
  const [unpurchasedOnly, setUnpurchasedOnly] = useState(false);


  return (
    <div>
      <SearchBar 
        items={items}
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

function SearchBar({ items, filterShop, unpurchasedOnly, onFilterShopChange, onUnPurhcasedOnlyChange }) {
  const shopList = ["All"]
  
  items.forEach((item) => {
    item.shop.forEach((shop) => {
      if (!(shopList.includes(shop))) {
        shopList.push(shop)
       }})
      });
    
  const shopListOption = shopList.map((shop) => {
    return (
    <option 
      value={shop} 
      key={shop}>
      {shop}
    </option>
      )});

  return (
    <form className='filter-bar font center'>
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

  items.forEach((item) => {
    if (filterShop !== "All" && (!(item.shop.includes(filterShop)))) {
        return;
      }

    if ((!(unpurchasedOnly)) || (unpurchasedOnly && (item.fulfilled === false))) {
    rows.push(
      <ItemRow
        item={item}
        key={item._id} />
      );
    }
  });

  return (
    <table className="table-header center font">
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

function ItemRow({item}) {
  const name = !(item.fulfilled) ? item.name :  <span><s>{item.name}</s></span>;

  return (
    <tr className="table-row font">
      <td>{name}</td>
      <td>{item.quantity}</td>
    </tr>
  );
}


export default function App() {

  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/items')
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setItems(data)
        })
      .catch((err) => {console.log(err.message)})
  }, []);


  return <FilterableItemTable items={items} />;
}