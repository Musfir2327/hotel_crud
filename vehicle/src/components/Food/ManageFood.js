import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './ManageFood.css';

const ManageFood = () => {
  const [foods, setFoods] = useState([]);
  const navigate = useNavigate();

  const fetchFoods = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/getfood');
      setFoods(response.data);
    } catch (error) {
      console.error('Error fetching food data:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/api/food/${id}`);
      alert('Food deleted successfully');
      setFoods(foods.filter((food) => food.id !== id));
    } catch (error) {
      alert('Error deleting food');
      console.error(error);
    }
  };

  const openEditPage = (food) => {
    navigate('/update', { state: { food } });  // Passing food data via state
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
            <th>Actions</th>
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
              <td>
                <button className="update" onClick={() => openEditPage(food)}>Update</button>
                <button className="delete"onClick={() => handleDelete(food.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageFood;
