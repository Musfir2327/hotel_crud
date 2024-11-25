import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import './pages/Car-dashboard/CarDashboard.css';


const CarView = () => {
    const [cars, setCars] = useState([]);
    

    useEffect(() => {
        const fetchCars = async () => {
            try {
                const response = await fetch("http://localhost:8000/api/getcar");
                const data = await response.json();
                setCars(data);
            } catch (error) {
                console.error("Error fetching data", error.message);
            }
        };
        fetchCars();
    }, []);

   



    return (
        <Container className="mt-5">
            
            <div className="car-list">
                {cars.map((car) => (
                    <div key={car.id} className="car-card">
                        <Row className="align-items-center">
                            <Col xs={12} md={4}>
                                {/* Left side for the image */}
                                <div className="car-image">
                                    {car.image && (
                                        <img
                                            src={`http://localhost:8000/api/car/${car.id}/image`} // Assuming your backend serves images at this endpoint
                                            alt={car.name}
                                            className="img-fluid"
                                        />
                                    )}
                                </div>
                            </Col>
                            <Col xs={12} md={8}>
                                {/* Right side for car details */}
                                <div className="car-details">
                                    <h3>{car.name}</h3>
                                    <p><strong>Brand:</strong> {car.brandname}</p>
                                    <p><strong>Color:</strong> {car.color}</p>
                                    <p><strong>Type:</strong> {car.type}</p>
                                    <p><strong>Transmission:</strong> {car.transmission}</p>
                                    <p><strong>Model Year:</strong> {car.modelyear}</p>
                                    <p><strong>Price:</strong> {car.price}</p>
                                    <p><strong>Description:</strong> {car.description}</p>
                                    
                                </div>
                            </Col>
                        </Row>
                    </div>
                ))}
            </div>
        </Container>
    );
};

export default CarView;
