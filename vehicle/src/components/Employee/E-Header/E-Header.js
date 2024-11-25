import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import { Link } from "react-router-dom";
import "./E-Header.css";

const EHeader = () => {
    return (
        <>
            <Navbar bg="primary" variant="dark">
                <Container>
                    <Navbar.Brand as={Link} to="/"><strong>Employee Management System</strong></Navbar.Brand>
                </Container>
            </Navbar>
            <div className="sidebar">
                <Nav className="flex-column">
                    <Nav.Link as={Link} to="/" className="nav-link">Employees</Nav.Link>
                    <Nav.Link as={Link} to="/employee" className="nav-link">Post Employees</Nav.Link>
                </Nav>
            </div>
            <div className="main-content">
                {/* Add your main content here */}
            </div>
        </>
    );
}

export default EHeader;