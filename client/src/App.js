import { useState, useEffect } from 'react'; 
import './App.css';
import logo from './logo.png'

const API_URL = "http://localhost:5005/api"

function FilterableItemTable({items}) {
  const [filterShop, setFilterShop] = useState('All');
  const [unpurchasedOnly, setUnpurchasedOnly] = useState(false);
  
  
  return (
    <div>
      <header>
        <a href="/" className="logo">
          <img src={logo} alt="Grosharies"/>
          <div className="logo-name">Grosharies</div>
        </a>
        
        <nav>
          <ul>
            <li><a 
            href="">About</a></li>
            <li><a 
            href="">Source Code</a></li>
          </ul>
        </nav>
      </header>
      <div>
        <div>
        <SearchBar 
          items={items}
          filterShop={filterShop}
          unpurchasedOnly={unpurchasedOnly}
          onFilterShopChange={setFilterShop}
          onUnPurhcasedOnlyChange={setUnpurchasedOnly}/>
        </div>

      </div>
      <ItemTable 
        items={items}
        filterShop={filterShop}
        />

        <footer>
          Enes © 2023
        </footer>
    </div>
  );
}

// function AddItem() {
//   const handleSubmit = (e) => {
//     e.preventDefault();
  
//     const form = e.target;
//     const formData = new FormData(form)
    
//     const formJson = Object.fromEntries(formData.entries());
  
//     console.log(formJson)
//     fetch(`${API_URL}/items`, { headers: {
//       "Content-Type": "application/json"}, method: form.method, body: JSON.stringify(formJson)})
//       .then((res) => res.json())
//       .then((data) => {
//         console.log(data);
//         })
//       .catch((err) => {console.log(err.message)});
//     }

//   return (
//     <a>Add New Item</a>
//     )
// }

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
        {'Show all'}
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
    <table className="table-header center font hover-row strike-able">
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