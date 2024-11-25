import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom'; 
import './UpdateRoom.css';

const UpdateRoom = () => {
  const { roomId } = useParams(); // Get roomId from URL parameters
  const navigate = useNavigate();
  const [room, setRoom] = useState({
    name: '',
    capacity: '',
    price: ''
  });

  useEffect(() => {
    if (roomId) {
      axios.get(`http://localhost:8000/api/getroom/${roomId}`)
        .then((response) => {
          setRoom(response.data);
        })
        .catch((error) => {
          console.error('Error fetching room data:', error);
        });
    }
  }, [roomId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRoom((prevRoom) => ({
      ...prevRoom,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.patch(`http://localhost:8000/api/room/${roomId}`, room) // Ensure this matches your backend
      .then(() => {
        alert('Room updated successfully!');
        navigate('/view-rooms');
      })
      .catch((error) => {
        console.error('Error updating room:', error);
        alert('Failed to update room.');
      });
  };

  return (
    <div>
      <h2>Update Room</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Room Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={room.name}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="capacity">Room Capacity:</label>
          <input
            type="number"
            id="capacity"
            name="capacity"
            value={room.capacity}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="price">Room Price:</label>
          <input
            type="number"
            id="price"
            name="price"
            value={room.price}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit">Update</button>
      </form>
    </div>
  );
};

export default UpdateRoom;