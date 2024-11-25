import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';

const EmployeeList = () => {
    const [employees, setEmployees] = useState([]);
    const [error, setError] = useState(null);

    // Fetch the employee list from the backend
    const fetchEmployees = async () => {
        try {
            const response = await fetch('http://localhost:8000/api/employees');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            setEmployees(data);
        } catch (error) {
            setError(error.message);
        }
    };

    useEffect(() => {
        fetchEmployees(); // Fetch employees on component mount
    }, []);

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this employee?")) {
            try {
                const response = await fetch(`http://localhost:8000/api/employee/${id}`, {
                    method: 'DELETE',
                });
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                fetchEmployees(); // Refresh the employee list after deletion
            } catch (error) {
                setError(error.message);
            }
        }
    };

    return (
        <div>
            <h2>Employee List</h2>
            {error && <p className="text-danger">{error}</p>}
            <Link to="/employee">
                <Button variant="primary">Add New Employee</Button>
            </Link>
            <ul>
                {employees.map(employee => (
                    <li key={employee.id}>
                        {employee.name} - {employee.email} - {employee.phone} - {employee.department}
                        <Link to={`/employee/${employee.id}`}>
                            <Button variant="warning" style={{ marginLeft: '10px' }}>Edit</Button>
                        </Link>
                        <Button variant="danger" style={{ marginLeft: '10px' }} onClick={() => handleDelete(employee.id)}>Delete</Button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default EmployeeList;