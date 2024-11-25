import React, { useEffect, useState } from "react";
import { Table, Button, Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const EventDashboard = () => {
  const [events, setEvents] = useState([]);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false); // State to control modal visibility
  const [selectedEventId, setSelectedEventId] = useState(null); // Store selected event ID for delete action
  const navigate = useNavigate();

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

  const handleDelete = async () => {
    try {
      const response = await fetch(`http://localhost:8000/api/kill/${selectedEventId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setEvents((prevEvents) => prevEvents.filter((event) => event.id !== selectedEventId));
        setShowModal(false); // Close the modal after deletion
      }
    } catch (error) {
      console.error("Error deleting event:", error.message);
    }
  };

  const handleUpdate = (eventId) => {
    // Navigate to UpdateEvent page with the event ID
    navigate(`/event/${eventId}`);
  };

  const handleShowModal = (eventId) => {
    setSelectedEventId(eventId); // Set the selected event ID for deletion
    setShowModal(true); // Show the confirmation modal
  };

  const handleCloseModal = () => {
    setShowModal(false); // Close the modal without doing anything
  };

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
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {events.length > 0 ? (
            events.map((event) => (
              <tr key={event.id}>
                <td>{event.id}</td>
                <td>{event.eventName}</td>
                <td>{event.price}</td>
                <td>
                  <Button variant="outline-secondary" onClick={() => handleUpdate(event.id)}>
                    Update
                  </Button>{" "}
                  <Button variant="outline-danger" onClick={() => handleShowModal(event.id)}>
                    Delete
                  </Button>
                </td>
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
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete this event? This action cannot be undone.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default EventDashboard;
