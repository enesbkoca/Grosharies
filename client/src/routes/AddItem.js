import React, {useState, useEffect} from 'react';
import { useNavigate } from "react-router-dom";
import { API_URL } from '../index'


function NewItem({shopList}) {
    const navigate  = useNavigate();
    const [name, setName] = useState('');
    const [quantity, setQuantity] = useState(1);
    const [shop, setShop] = useState('');
    const [newShop, setNewShop] = useState('')

    const handleSubmit = (event) => {
        event.preventDefault();
        

        const selectedShop = shop === "Other" ? newShop : shop;
        
        const form = {
            'name': name,
            'quantity': quantity,
            'shop': selectedShop
            }
        
        console.log(JSON.stringify(form));
        
        fetch(`${API_URL}/items`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(form)
            })
                .then(response => response.json())
                .then(response => console.log(response))
                .then(() => navigate("/"))
                .catch((err) => (console.log(err.error)))

        // Redirect to homepage
        
    }

    const handleNewShopChange = (event) => {
        setNewShop(event.target.value);
    };

    const shopOptions = shopList.map((shop) => {
        return (
            <option value={shop} key={shop}>{shop}</option>
        )});

    return (
        <div>
          <h1>Add New Item</h1>
          <form onSubmit={handleSubmit}>
            <label>
              Name:
              <input
                type="text"
                value={name}
                onChange={(event) => setName(event.target.value)}
                required
              />
            </label>
            <br />
            <label>
              Quantity:
              <input
                type="number"
                value={quantity}
                onChange={(event) => setQuantity(event.target.value)}
                required
              />
            </label>
            <br />
            <label>
              Shop:
              <select value={shop} onChange={(event) => setShop(event.target.value)} required>
                <option value="Any" key="Any">Any</option>
                {shopOptions}
                {newShop !== '' && <option value={newShop}>{newShop}</option>}
                <option value="Other" key="Other">Other</option>
              </select>
              {shop === "Other" && (
                <div>
                    <input
                        type="text"
                        value={newShop}
                        onChange={handleNewShopChange}
                        placeholder="Enter the new shop name"
                        required
                    />
                </div>
          )}
            </label>
            <br />
            <button type="submit">Create</button>
          </form>
        </div>
      );
    }




export default function AddItem () {
    const [shopList, setShopList] = useState([])

    useEffect(() => {
        fetch(`${API_URL}/items`)
            .then((res) => res.json())
            .then((data) => {
            console.log(data);
            const uniqueShops = Array.from(
                new Set(data.flatMap((item) => item.shop))
            );
            setShopList(uniqueShops);
            })
            .catch((err) => {
                console.log(err.message);
            });
    }, []);

    return NewItem({shopList});

};