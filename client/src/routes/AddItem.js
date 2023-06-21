import React, {useState, useEffect} from 'react';
import Select, { components } from "react-select";
import { useNavigate } from "react-router-dom";
import { API_URL } from '../api/calls'


const Option = (props) => {
  return (
    <div>
      <components.Option {...props}>
        <input
          type="checkbox"
          checked={props.isSelected}
          onChange={() => null}
          />{" "}
          <label>{props.label}</label>
      </components.Option>
    </div>
  )
}


function NewItem({shopList}) {
    const navigate  = useNavigate();
    const [name, setName] = useState('');
    const [quantity, setQuantity] = useState(1);
    const [shop, setShop] = useState([]);

    const handleSubmit = (event) => {
        event.preventDefault();
        
        
        const form = {
            'name': name,
            'quantity': quantity,
            'shop': shop
            }
        
        console.log(JSON.stringify(form));
        
        // Post new item
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

    const shopOptions = shopList.map((shop) => {
        return (
            {value: shop, label: shop}
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
            <Select
              options={shopOptions}
              isMulti
              closeMenuOnSelect={false}
              hideSelectedOptions={false}
              allowSelectAll={true}
              components={{
                Option
              }}
              onChange={(selectedOptions) => {
                const selectedValues = selectedOptions ? selectedOptions.map(option => option.value): [];
                setShop(selectedValues);
              }}
            />
            <br />
            <button type="submit">Create</button>
          </form>
        </div>
      );
    }




export default function AddItem () {
    const [shopList, setShopList] = useState([])


    // Fetch items to get unique shops
    useEffect(() => {
        fetch(`${API_URL}/items`)
            .then((res) => res.json())
            .then((data) => {
            // console.log(data);
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