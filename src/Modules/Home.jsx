// src/App.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {
    const [items, setItems] = useState([]);
    const [name, setName] = useState('');
    const [value, setValue] = useState('');

    useEffect(() => {
        const fetchItems = async () => {
            const result = await axios.get('http://localhost:8080/items');
            setItems(result.data);
        };

        fetchItems();
    }, []);

    const addItem = async () => {
        const result = await axios.post('http://localhost:8080/items', { name, value });
        setItems(prevItems => {
            const index = prevItems.findIndex(item => item.name === result.data.name);
            if (index !== -1) {
                prevItems[index] = result.data;
                return [...prevItems];
            } else {
                return [...prevItems, result.data];
            }
        });
        setName('');
        setValue('');
    };

    return (
        <div>
            <h1>Dynamic Array in MERN</h1>
            <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <input
                type="text"
                placeholder="Value"
                value={value}
                onChange={(e) => setValue(e.target.value)}
            />
            <button onClick={addItem}>Add Item</button>
            <ul>
                {items.map((item, index) => (
                    <li key={index}>
                        <strong>{item.name}:</strong> {item.values.join(', ')}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default App;
