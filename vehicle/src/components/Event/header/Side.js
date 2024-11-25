import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import "./Sidebar.css";

const Side = () => {
  return (
    <>
      <Navbar bg="primary" variant="dark" className="sidebar">
        <Container>
          <Navbar.Brand className="sidebar-brand" to="/">
            <strong>Event Reservation</strong>
          </Navbar.Brand>
          <Nav className="flex-column mt-3">
            <Nav.Link as={Link} to="/admin" className="nav-link">Events</Nav.Link>
            <Nav.Link as={Link} to="/events" className="nav-link">Post New Events</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
};

export default Side;
