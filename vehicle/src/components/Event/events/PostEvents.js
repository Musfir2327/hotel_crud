import React, { useState } from "react";
import "./PostEvents.css";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import { Modal } from "react-bootstrap";

const PostEvents = () => {
  const [formData, setFormData] = useState({
    eventName: "",
    price: "",
  });

  const [showSuccessModal, setShowSuccessModal] = useState(false); // State for success modal
  const navigate = useNavigate();

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const preparedData = {
      ...formData,
      price: Number(formData.price), // Convert price to a number if required
    };

    try {
      const response = await fetch("http://localhost:8000/api/reserve", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(preparedData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Response Created:", data);

      // Show the success modal
      setShowSuccessModal(true);

      // Optionally close the modal and navigate after a short delay
      setTimeout(() => {
        setShowSuccessModal(false);
        navigate("/admin"); // Navigate to the admin dashboard after the success message
      }, 2000); // Hide modal after 2 seconds

    } catch (error) {
      console.error("Error Creating Event:", error.message);
    }
  };

  return (
    <div className="center-form">
      <h1>Post New Event</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formEventName" className="mb-3">
          <Form.Control
            type="text"
            name="eventName"
            placeholder="Enter Event Name"
            value={formData.eventName}
            onChange={handleInputChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="formPrice" className="mb-3">
          <Form.Control
            type="text"
            name="price"
            placeholder="Enter Price For Event"
            value={formData.price}
            onChange={handleInputChange}
            required
          />
        </Form.Group>

        <Button variant="primary" type="submit" className="w-100">
          Post Event
        </Button>
      </Form>

      {/* Success Modal */}
      <Modal show={showSuccessModal} onHide={() => setShowSuccessModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Success</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Event has been successfully added!</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={() => setShowSuccessModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default PostEvents;
