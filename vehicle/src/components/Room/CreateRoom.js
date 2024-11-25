import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './CreateRoom.css';

const CreateRoom = () => {
  const [roomData, setRoomData] = useState({
    name: '',
    capacity: '',
    price: ''
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRoomData({
      ...roomData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Send data to the backend (POST request)
    fetch('http://localhost:8000/api/room', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(roomData)
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Room Created:', data);

        // Navigate to the ViewRooms page after successful creation
        navigate('/view-rooms');
      })
      .catch((error) => console.error('Error:', error));

    // Reset the form after submission
    setRoomData({
      name: '',
      capacity: '',
      price: ''
    });
  };

  return (
    <div className="form-container">
      <h2>Create New Room</h2>
      <form onSubmit={handleSubmit} className="room-form">
        <div className="form-group">
          <label>Room Name:</label>
          <input
            type="text"
            name="name"
            value={roomData.name}
            onChange={handleChange}
            required
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label>Room Capacity:</label>
          <input
            type="number"
            name="capacity"
            value={roomData.capacity}
            onChange={handleChange}
            required
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label>Room Price:</label>
          <input
            type="number"
            name="price"
            value={roomData.price}
            onChange={handleChange}
            required
            className="form-input"
          />
        </div>
        <button type="submit" className="submit-btn">
          Create Room
        </button>
      </form>
    </div>
  );
};

export default CreateRoom;
