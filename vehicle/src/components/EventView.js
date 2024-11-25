import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";


const EventView = () => {
  const [events, setEvents] = useState([]);
  const [error, setError] = useState(null);


  // Fetch events from the backend
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/reservation");
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setEvents(data);
      } catch (error) {
        setError("Unable to fetch events. Please try again later.");
      }
    };

    fetchEvents();
  }, []);

  

     
  




  return (
    <div className="dashboard-container">
      <h1>Event Management</h1>

      {error && <p className="error-text">{error}</p>}

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Event Name</th>
            <th>Price</th>
            
          </tr>
        </thead>
        <tbody>
          {events.length > 0 ? (
            events.map((event) => (
              <tr key={event.id}>
                <td>{event.id}</td>
                <td>{event.eventName}</td>
                <td>{event.price}</td>
              
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="text-center">
                No events found.
              </td>
            </tr>
          )}
        </tbody>
      </Table>

      {/* Modal for confirming deletion */}
  
    </div>
  );
};

export default EventView;
