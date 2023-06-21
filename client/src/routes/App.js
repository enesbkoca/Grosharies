import { useState, useEffect } from 'react'; 
import { Link } from 'react-router-dom';
import '../styles/App.css';
import { API_URL, crossItem } from '../api/calls';

function FilterableItemTable({items}) {
  const [filterShop, setFilterShop] = useState('All');
  const [showAll, setShowAll] = useState(false);
  
  return (
    <div>
        <SearchBar
          items={items}
          filterShop={filterShop}
          showAll={showAll}
          onFilterShopChange={setFilterShop}
          onShowAllChange={setShowAll}/>
      <ItemTable 
        items={items}
        filterShop={filterShop}
        showAll={showAll}
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

function SearchBar({ items, showAll, onFilterShopChange, onShowAllChange }) {
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
        checked={showAll}
        onChange={(e) => {onShowAllChange(e.target.checked)}}/>
        {'Show all'}
      </label>
      <AddItem/>
    </div>
  );
}

function ItemTable({items, filterShop, showAll}) {
  const rows = [];

  items.forEach((item) => {
    if (filterShop !== "All" && (!(item.shop.includes(filterShop)))) {
        return;
      }
    if ((item.fulfilled === false) || (item.fulfilled && showAll)) {
      rows.push(
        <ItemRow
          item={item}
          key={item._id}
          id={item._id} />
        );
      }
    });

  return (
    <table className="item-table hover-row strike-able">
      <tbody>{rows}</tbody>
    </table>
  );
}

function ItemRow({item, id}) {

  return (
    <tr key={id} className={`item-row ${item.fulfilled ? "strikeout" : ""}`} onClick={() => {crossItem(id, item.fulfilled)}}>
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
        // console.log(data);
        setItems(data)
        })
      .catch((err) => {console.log(err.message)})
  }, []);


  return <FilterableItemTable 
  items={items}/>;
}


// get_items()
//               .then(res => console.log(res))
//               .catch(err => console.log(err.message))