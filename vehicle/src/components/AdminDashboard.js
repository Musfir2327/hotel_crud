import React from 'react';
import { Link } from 'react-router-dom';

const AdminDashboard = ({ setShowHamburgerMenu, setCurrentMenu }) => {
    const handleCarButtonClick = () => {
        setShowHamburgerMenu(true);
        setCurrentMenu('Car');
    };

    const handleEventButtonClick = () => {
        setShowHamburgerMenu(true);
        setCurrentMenu('Event');
    };

    const handleFoodButtonClick = () => {
        setShowHamburgerMenu(true);
        setCurrentMenu('Food');
    };

    const handleEmployeeButtonClick = () => {
        setShowHamburgerMenu(true);
        setCurrentMenu('Employee');
    };

    const handleRoomButtonClick = () => {
        setShowHamburgerMenu(true);
        setCurrentMenu('Room');
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', padding: '30px', gap: '0px' }}>
            <Link to="/dashboard">
                <button
                    style={{
                        padding: '20px',
                        backgroundColor: 'blue',
                        color: 'white',
                        border: 'none',
                        borderRadius: '10px',
                        cursor: 'pointer',
                    }}
                    onClick={handleCarButtonClick}
                >
                    Car
                </button>
            </Link>

            <Link to="/admin">
                <button
                    style={{
                        padding: '20px',
                        backgroundColor: 'blue',
                        color: 'white',
                        border: 'none',
                        borderRadius: '10px',
                        cursor: 'pointer',
                    }}
                    onClick={handleEventButtonClick}
                >
                    Event
                </button>
            </Link>

            <Link to="/add">
                <button
                    style={{
                        padding: '20px',
                        backgroundColor: 'blue',
                        color: 'white',
                        border: 'none',
                        borderRadius: '10px',
                        cursor: 'pointer',
                    }}
                    onClick={handleFoodButtonClick}
                >
                    Food
                </button>
            </Link>

            <Link to="/Edash">
                <button
                    style={{
                        padding: '20px',
                        backgroundColor: 'blue',
                        color: 'white',
                        border: 'none',
                        borderRadius: '10px',
                        cursor: 'pointer',
                    }}
                    onClick={handleEmployeeButtonClick}
                >
                    Employee
                </button>
            </Link>

            <Link to="/view-rooms">
                <button
                    style={{
                        padding: '20px',
                        backgroundColor: 'blue',
                        color: 'white',
                        border: 'none',
                        borderRadius: '10px',
                        cursor: 'pointer',
                    }}
                    onClick={handleRoomButtonClick}
                >
                    Rooms
                </button>
            </Link>
        </div>
    );
};

export default AdminDashboard;
