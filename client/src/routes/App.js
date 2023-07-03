import { useState, useEffect } from 'react'; 
import { Link } from 'react-router-dom';
import '../styles/App.css';
import { crossItem, getItems, getShops } from '../api/calls';
import { useNavigate } from 'react-router-dom';

function FilterableItemTable() {
  const [items, setItems] = useState([]);
  const [filterShop, setFilterShop] = useState('All');
  const [showAll, setShowAll] = useState(true);
  const [updatedItems, setUpdatedItems] = useState([]);

  useEffect(() => {
    getItems()
      .then((data) => {
        setItems(data);
        setUpdatedItems(data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  // Function to handle crossing out an item
  const handleCrossItem = (id, fulfilled) => {
    crossItem(id, fulfilled)
      .then(() => {
        setUpdatedItems((prevItems) => {
          return prevItems.map((item) => {
            if (item._id === id) {
              return { ...item, fulfilled: !fulfilled };
            }
            return item;
          });
        });
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  useEffect(() => {
    // Filter the items based on filterShop and showAll
    const filteredItems = items.filter((item) => {
      if (filterShop !== 'All') {
        return item.shop.includes(filterShop);
      } else {
        return true;
      }
    });

    setUpdatedItems(filteredItems);
  }, [items, filterShop, showAll]);

  return (
    <div>
      <SearchBar
        items={items}
        filterShop={filterShop}
        showAll={showAll}
        onFilterShopChange={setFilterShop}
        onShowAllChange={setShowAll}
      />
      {updatedItems && updatedItems.length > 0 ? (
        <ItemTable
          items={updatedItems}
          handleCrossItem={handleCrossItem}
          filterShop={filterShop}
          showAll={showAll}
        />
      ) : (
        <p>No items available</p>
      )}
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
  );
}

function SearchBar({ items }) {
  const [filterShop, setFilterShop] = useState('All');
  const [showAll, setShowAll] = useState(true);
  const [shops, setShops] = useState([]);

  useEffect(() => {
    getShops()
      .then((data) => {
        const uniqueShops = ['All', ...data.map((shop) => shop.name)];
        setShops(uniqueShops);
      })
      .catch((error) => {
        console.log(error.message);
      });
  }, []);

  return (
    <div className="filter-bar">
      <select
        name="shops"
        id="shops"
        value={filterShop}
        onChange={(e) => setFilterShop(e.target.value)}
      >
        {shops.map((shop) => (
          <option value={shop} key={shop}>
            {shop}
          </option>
        ))}
      </select>

      <label>
        <input
          type="checkbox"
          checked={showAll}
          onChange={(e) => setShowAll(e.target.checked)}
        />
        Show all
      </label>
      <AddItem />
    </div>
  );
}

function ItemTable({ items, handleCrossItem, filterShop, showAll }) {
  const filteredItems = items.filter((item) => {
    if (filterShop !== 'All') {
      return item.shop.includes(filterShop);
    } else {
      return true;
    }
  });

  const rows = filteredItems.map((item) => (
    <ItemRow item={item} key={item._id} handleCrossItem={handleCrossItem} />
  ));

  return (
    <table className="item-table hover-row strike-able">
      <tbody>{rows}</tbody>
    </table>
  );
}

function ItemRow({ item, handleCrossItem }) {
  const navigate = useNavigate();

  return (
    <tr
      key={item._id}
      className={`item-row ${item.fulfilled ? 'strikeout' : ''}`}
    >
      <td
        className="strike-able"
        onClick={() => handleCrossItem(item._id, item.fulfilled)}
      >
        {item.name}
      </td>
      <td
        className="strike-able center"
        onClick={() => handleCrossItem(item._id, item.fulfilled)}
      >
        {item.quantity}
      </td>
      <td>
        <button
          style={{ float: 'right' }}
          onClick={() => navigate(`/edit/${item._id}`)}
        >
          Edit
        </button>
      </td>
    </tr>
  );
}

export default function App() {
  return <FilterableItemTable />;
}
