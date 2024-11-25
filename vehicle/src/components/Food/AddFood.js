import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './AddFood.css';

const AddFood = () => {

  

  const [foodName, setFoodName] = useState('');
  const [foodPrice, setFoodPrice] = useState('');
  const [foodTime, setFoodTime] = useState('Breakfast');
  const [image, setImage] = useState(null);
  const navigate = useNavigate();

  // Handle image change
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
    }
  };

  // Handle form submission
  const handleAddFood = async () => {
    if (!foodName || !foodPrice || !image) {
      alert('Please fill all fields and select an image');
      return;
    }

    // Validate food price to ensure it's a number
    const price = parseFloat(foodPrice);
    if (isNaN(price) || price <= 0) {
      alert('Please enter a valid price');
      return;
    }

    // Create FormData object and append fields
    const formData = new FormData();
    formData.append('name', foodName);  // Food name
    formData.append('price', price);  // Food price
    formData.append('time', foodTime);  // Food time
    formData.append('image', image);  // Image file

    try {
      // Send POST request to backend with form data
      await axios.post('http://localhost:8000/api/food', formData);
      alert('Food added successfully');
      navigate('/manage-food');  // Navigate to manage-food page
    } catch (error) {
      alert('Error adding food');
      console.error(error);
    }
  };

  return (
    <div>
  

      <h2>Hotel Management System</h2>

      <form onSubmit={(e) => e.preventDefault()}>
        <div>
          <label>Food Name:</label>
          <input
            type="text"
            value={foodName}
            onChange={(e) => setFoodName(e.target.value)}
          />
        </div>
        <div>
          <label>Food Price:</label>
          <input
            type="number"
            value={foodPrice}
            onChange={(e) => setFoodPrice(e.target.value)}
          />
        </div>
        <div>
          <label>Food Time:</label>
          <select
            value={foodTime}
            onChange={(e) => setFoodTime(e.target.value)}
          >
            <option value="Breakfast">Breakfast</option>
            <option value="Lunch">Lunch</option>
            <option value="Dinner">Dinner</option>
          </select>
        </div>

        {/* Image upload field */}
        <div>
          <label>Food Image:</label>
          <input type="file" accept="image/*" onChange={handleImageChange} />
        </div>

        <button type="button" onClick={handleAddFood}>
          Add
        </button>
      </form>
    </div>
  );
};

export default AddFood;
