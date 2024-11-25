import React, { useEffect, useState } from 'react';
import './ViewRooms.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ViewRooms = () => {
  const [rooms, setRooms] = useState([]);
  const navigate = useNavigate(); // Initialize useNavigate hook

  useEffect(() => {
    // Fetch rooms data
    axios.get('http://localhost:8000/api/getroom')
      .then(response => setRooms(response.data))
      .catch(error => console.error('Error fetching rooms:', error));
  }, []); // Fetch rooms only once when the component mounts

  const handleUpdate = (id) => {
    console.log(`Navigating to update room with ID: ${id}`);
    // Navigate to the UpdateRoom page with the roomId as a URL parameter
    navigate(`/update-room/${id}`);
  };

  const handleDelete = (id) => {
    axios.delete(`http://localhost:8000/api/room/${id}`)
      .then(() => {
        setRooms(rooms.filter(room => room.id !== id)); // Remove the deleted room from the state
        console.log(`Room with ID: ${id} deleted`);
      })
      .catch(error => console.error('Error deleting room:', error));
  };

  return (
    <div className="view-rooms-container">
      <h2>Rooms</h2>
      <table>
        <thead>
          <tr>
            <th>Room Name</th>
            <th>Capacity</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {rooms.map(room => (
            <tr key={room.id}>
              <td>{room.name}</td>
              <td>{room.capacity}</td>
              <td>{room.price}</td>
              <td className="action-buttons">
                <button className="update-btn" onClick={() => handleUpdate(room.id)}>Update</button>
                <button className="delete-btn" onClick={() => handleDelete(room.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ViewRooms;