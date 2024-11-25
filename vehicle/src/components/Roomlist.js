import React, { useEffect, useState } from 'react';
import './Room/ViewRooms.css';
import axios from 'axios';


const RoomList = () => {
  const [rooms, setRooms] = useState([]);
   

  useEffect(() => {
    // Fetch rooms data
    axios.get('http://localhost:8000/api/getroom')
      .then(response => setRooms(response.data))
      .catch(error => console.error('Error fetching rooms:', error));
  }, []); // Fetch rooms only once when the component mounts

 

  return (
    <div className="view-rooms-container">
      <h2>Rooms</h2>
      <table>
        <thead>
          <tr>
            <th>Room Name</th>
            <th>Capacity</th>
            <th>Price</th>
            
          </tr>
        </thead>
        <tbody>
          {rooms.map(room => (
            <tr key={room.id}>
              <td>{room.name}</td>
              <td>{room.capacity}</td>
              <td>{room.price}</td>
           
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RoomList;