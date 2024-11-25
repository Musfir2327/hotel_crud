import { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";

const UpdateEvent = () => {
  const { id } = useParams(); // Get the event ID from URL
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    eventName: "",
    price: "",
  });

  const [error, setError] = useState(null);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await fetch(`http://localhost:8000/api/reservation/${id}`);
        if (!response.ok) {
          throw new Error("Event not found.");
        }
        const data = await response.json();
        setFormData(data);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchEvent();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`http://localhost:8000/api/reserve/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to update event.");
      }

      navigate("/admin"); // Redirect to admin dashboard after update
    } catch (error) {
      console.error("Error updating event:", error.message);
    }
  };

  return (
    <div className="center-form">
      <h1>Edit Event</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formBasicName" className="mb-3">
          <Form.Control
            type="text"
            name="eventName"
            placeholder="Enter Event Name"
            value={formData.eventName || ""}
            onChange={handleInputChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="formBasicPrice" className="mb-3">
          <Form.Control
            type="text"
            name="price"
            placeholder="Enter Event Price"
            value={formData.price || ""}
            onChange={handleInputChange}
            required
          />
        </Form.Group>

        {error && <p className="error-message">{error}</p>}

        <Button variant="primary" type="submit" className="w-100">
          Edit Event
        </Button>
      </Form>
    </div>
  );
};

export default UpdateEvent;
