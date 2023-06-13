import { useState, useEffect } from 'react'; 
import './App.css';


const API_URL = "http://localhost:5005/api"

function FilterableItemTable({items, extendAddButton, setExtendAddButton}) {
  const [filterShop, setFilterShop] = useState('All');
  const [unpurchasedOnly, setUnpurchasedOnly] = useState(true);
  
  
  return (
    <div className="center">
      <div className="width-80 center">

        <div className={`width-50-left ${extendAddButton ? "hidden" : ""}`}>
        <SearchBar 
          items={items}
          filterShop={filterShop}
          unpurchasedOnly={unpurchasedOnly}
          onFilterShopChange={setFilterShop}
          
          onUnPurhcasedOnlyChange={setUnpurchasedOnly}/>
        </div>

        <div className="width-50-right">
          <AddItem
          extendAddButton={extendAddButton}
          setExtendAddButton={setExtendAddButton}/>
        </div>

      </div>
      <ItemTable 
        items={items}
        filterShop={filterShop}
        />
    </div>
  );
}


function AddItem({extendAddButton, setExtendAddButton}) {
  const handleSubmit = (e) => {
    e.preventDefault();
  
    const form = e.target;
    const formData = new FormData(form)
    
    const formJson = Object.fromEntries(formData.entries());
  
    console.log(formJson)
    fetch(`${API_URL}/items`, { headers: {
      "Content-Type": "application/json"}, method: form.method, body: JSON.stringify(formJson)})
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        })
      .catch((err) => {console.log(err.message)});

      setExtendAddButton(false);
    }

  return (
    <form 
      method="post"
      onSubmit = {handleSubmit}
      className={`add-item`}
      onMouseOver={() => {setExtendAddButton(true)}}
      onMouseLeave={() => {setExtendAddButton(false)}}>
        <input type="text" name="name"
        className = "add-input"
        required></input>
        <input type="submit" className="fa fa-search" value="+"></input>
    </form>
    )
}

function SearchBar({ items, filterShop, unpurchasedOnly, onFilterShopChange, onUnPurhcasedOnlyChange, setExtendAddButton }) {
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
    <form className='filter-bar font'>
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

function ItemTable({items, filterShop, extendAddButton, unpurchasedOnly}) {
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
    <table className="table-header center font hover-row strike-able">
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
  // const name = !(item.fulfilled) ? item.name :  <span><s>{item.name}</s></span>;

  return (
    <tr className={`table-row font ${item.fulfilled ? "strikeout" : ""}`}>
      <td className="strike-able">{item.name}</td>
      <td className="strike-able">{item.quantity}</td>
    </tr>
  );
}


export default function App() {

  const [items, setItems] = useState([]);
  const [extendAddButton, setExtendAddButton] = useState(false);

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
  items={items}
  extendAddButton={extendAddButton}
  setExtendAddButton={setExtendAddButton}/>;
}