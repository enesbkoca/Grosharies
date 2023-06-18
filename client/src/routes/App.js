import { useState, useEffect } from 'react'; 
import { Link } from 'react-router-dom';
import '../styles/App.css';

const API_URL = "http://localhost:5005/api"

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
        />
    </div>
  );
}

function AddItem() {
  return (
    <div>
      <Link to="/additem">
        <button type="button">Add New Item</button>
      </Link>
    </div>
  )
};

function SearchBar({ items, filterShop, unpurchasedOnly, onFilterShopChange, onUnPurhcasedOnlyChange}) {
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
    <div className="filter-bar">
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
        {'Show all'}
      </label>
      <AddItem/>
    </div>
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
    <table className="item-table hover-row strike-able">
      <tbody>{rows}</tbody>
    </table>
  );
}

function ItemRow({item}) {
  // const name = !(item.fulfilled) ? item.name :  <span><s>{item.name}</s></span>;

  return (
    <tr className={`item-row ${item.fulfilled ? "strikeout" : ""}`}>
      <td className="strike-able">{item.name}</td>
      <td className="strike-able center">{item.quantity}</td>
      <td><button style={{ float: "right" }}>Edit</button></td>
    </tr>
  );
}


export default function App() {

  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch(`${API_URL}/items`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setItems(data)
        })
      .catch((err) => {console.log(err.message)})
  }, []);


  return <FilterableItemTable 
  items={items}/>;
}