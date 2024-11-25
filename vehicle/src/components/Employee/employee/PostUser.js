import "./PostUser.css"; // Ensure you have this CSS file for styling
import Form from "react-bootstrap/Form";
import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import { useNavigate, useParams } from "react-router-dom";

const PostUser = () => {
    const { id } = useParams(); // Get the ID from the URL parameters if available
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        department: ""
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    // Fetch employee data if an ID is provided
    useEffect(() => {
        const fetchEmployee = async () => {
            if (id) {
                setLoading(true); // Set loading state
                try {
                    const response = await fetch(`http://localhost:8000/api/employee/${id}`);
                    if (!response.ok) {
                        throw new Error(`HTTP error! status: ${response.status}`);
                    }
                    const data = await response.json();
                    setFormData(data); // Set the form data to the fetched employee data
                } catch (error) {
                    setError(error.message); // Set error message
                } finally {
                    setLoading(false); // Reset loading state
                }
            }
        };

        fetchEmployee();
    }, [id]);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const method = id ? "PUT" : "POST"; // Use PUT if editing, POST if creating
            const url = id ? `http://localhost:8000/api/employee/${id}` : 'http://localhost:8000/api/employee';

            const response = await fetch(url, {
                method: method,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json(); // Correctly parse the JSON response
            console.log("Employee processed: ", data);
            navigate("/Edash"); // Navigate to the desired route after successful submission
        } catch (error) {
            setError(error.message); // Set error message
        }
    };

    return (
        <div className="center-form">
            <h1>{id ? "Update Employee" : "Post New Employee"}</h1>
            {loading && <p>Loading...</p>}
            {error && <p className="text-danger">{error}</p>}
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formBasicName">
                    <Form.Control
                        type="text"
                        name="name"
                        placeholder="Enter name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                    />
                </Form.Group>

                <Form.Group controlId="formBasicEmail">
                    <Form.Control
                        type="email"
                        name="email"
                        placeholder="Enter email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                    />
                </Form.Group>

                <Form.Group controlId="formBasicPhone">
                    <Form.Control
                        type="text"
                        name="phone"
                        placeholder="Enter phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        required
                    />
                </Form.Group>

                <Form.Group controlId="formBasicDepartment">
                    <Form.Control
                        type="text"
                        name="department"
                        placeholder="Enter department"
                        value={formData.department}
                        onChange={handleInputChange}
                        required
                    />
                </Form.Group>

                <Button variant="primary" type="submit" className="w-100">
                    {id ? "Update Employee" : "Post Employee"}
                </Button>
            </Form>
        </div>
    );
};

export default PostUser;