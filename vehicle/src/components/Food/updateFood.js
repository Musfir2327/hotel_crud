import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import './UpdateFood.css';

const UpdateFood = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { food } = location.state; // Access passed food data
  
  const [editedFood, setEditedFood] = useState({ ...food });
  const [imagePreview, setImagePreview] = useState(food.image); // Preview existing image

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedFood((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle image file change
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setEditedFood((prev) => ({
      ...prev,
      imageFile: file,
    }));

    // Set image preview if file is selected
    if (file) {
      setImagePreview(URL.createObjectURL(file));
    }
  };

  // Handle form submission
  const handleUpdate = async () => {
    // Basic validation for required fields
    if (!editedFood.name || !editedFood.price) {
      alert('Please fill in all the required fields.');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('name', editedFood.name);
      formData.append('price', editedFood.price);
      formData.append('time', editedFood.time);
      
      if (editedFood.imageFile) {
        formData.append('image', editedFood.imageFile);
      }

      // Send PATCH request to update food item
      await axios.patch(`http://localhost:8000/api/food/${editedFood.id}`, formData);
      alert('Food updated successfully');
      navigate('/manage-food'); // Redirect back to the manage-food page
    } catch (error) {
      alert('Error updating food');
      console.error('Update error:', error);
    }
  };

  return (
    <div>


      <h2>Edit Food</h2>
      

      <form onSubmit={(e) => e.preventDefault()}>
        <div>
          <label>Food Name:</label>
          <input
            type="text"
            name="name"
            value={editedFood.name}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Food Price:</label>
          <input
            type="number"
            name="price"
            value={editedFood.price}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Food Time:</label>
          <select
            name="time"
            value={editedFood.time}
            onChange={handleInputChange}
          >
            <option value="Breakfast">Breakfast</option>
            <option value="Lunch">Lunch</option>
            <option value="Dinner">Dinner</option>
          </select>
        </div>
        <div>
          <label>Food Image:</label>
          <input type="file" name="image" onChange={handleFileChange} />
        </div>
        {/* Display selected image preview */}
        {imagePreview && (
          <div>
            <img
              src={imagePreview}
              alt="Food Preview"
              style={{ width: '100px', height: 'auto', marginTop: '10px' }}
            />
          </div>
        )}
        <button type="button" onClick={handleUpdate}>
          Save
        </button>
      </form>
    </div>
  );
};

export default UpdateFood;
