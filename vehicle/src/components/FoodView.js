import React, { useState, useEffect } from 'react';
import axios from 'axios';

import './Food/ManageFood.css';

const ManageFood = () => {
  const [foods, setFoods] = useState([]);
  

  const fetchFoods = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/getfood');
      setFoods(response.data);
    } catch (error) {
      console.error('Error fetching food data:', error);
    }
  };

 

  useEffect(() => {
    fetchFoods();
  }, []);

  return (
    <div>
    

      <h2>Manage Food</h2>
      

      <table border="1">
        <thead>
          <tr>
            <th>Food Name</th>
            <th>Food Price</th>
            <th>Food Time</th>
            <th>Image</th>
            
          </tr>
        </thead>
        <tbody>
          {foods.map((food) => (
            <tr key={food.id}>
              <td>{food.name}</td>
              <td>{food.price}</td>
              <td>{food.time}</td>
              <td>
                {food.image ? (
                  <img
                    src={`data:image/jpeg;base64,${food.image}`}
                    alt={food.name}
                    style={{ width: '100px', height: 'auto' }}
                  />
                ) : (
                  'No Image'
                )}
              </td>
          
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageFood;
