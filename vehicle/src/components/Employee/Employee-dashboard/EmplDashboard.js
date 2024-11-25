import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Table from "react-bootstrap/Table";
import { Button } from "react-bootstrap";
import "./EmplDashboard.css";

const EmplDashboard = () => {
    const [employees, setEmployees] = useState([]);
    const navigate = useNavigate(); // Initialize useNavigate

    useEffect(() => {
        const fetchEmployees = async () => {
            try {
                const response = await fetch("http://localhost:8000/api/employees");
                const data = await response.json();
                setEmployees(data);
            } catch (error) {
                console.log("Error fetching employees: ", error.message);
            }
        };

        fetchEmployees();
    }, []);

    const handleDelete = async (employeeId) => {
        try {
            await fetch(`http://localhost:8000/api/employee/${employeeId}`, {
                method: "DELETE",
            });
            setEmployees(employees.filter(employee => employee.id !== employeeId)); // Update state to remove deleted employee
            console.log(`Employee with ID ${employeeId} deleted successfully`);
        } catch (error) {
            console.log("Error deleting employee:", error.message);
        }
    };

    const handleUpdate = (employeeId) => {
        navigate(`/employee/${employeeId}`); // Navigate to the update page with employee ID
    };

    return (
        <Container className="mt-5">
            <Row>
                <Col>
                    <h1 className="text-center">Employees</h1>
                    <Table striped bordered hover responsive>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Phone</th>
                                <th>Department</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {employees.map(employee => (
                                <tr key={employee.id}>
                                    <td>{employee.name}</td>
                                    <td>{employee.email}</td>
                                    <td>{employee.phone}</td>
                                    <td>{employee.department}</td>
                                    <td>
                                        <Button variant="outline-secondary" onClick={() => handleUpdate(employee.id)}>Update</Button>{" "}
                                        <Button variant="outline-danger" onClick={() => handleDelete(employee.id)}>Delete</Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </Col>
            </Row>
        </Container>
    );
};

export default EmplDashboard;