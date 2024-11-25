import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Header.css';

const Header = ({ isAuthenticated, setIsAuthenticated, showHamburgerMenu, toggleSidebar }) => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userRole');
        localStorage.removeItem('showHamburgerMenu');
        setIsAuthenticated(false);
        navigate('/');
    };

    return (
        <nav className="navbar-header">
            <div className="navbar-logo">
                <Link to="/">MyApp</Link>
            </div>
            <ul className="navbar-list">
                {!isAuthenticated ? (
                    <>
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/signup">Signup</Link></li>
                        <li><Link to="/login">Login</Link></li>
                    </>
                ) : (
                    <>
                        <li>
                            <button onClick={handleLogout} className="logout-button">Logout</button>
                        </li>
                        {showHamburgerMenu && (
                            <li>
                                <button className="hamburger-button" onClick={toggleSidebar}>☰</button>
                            </li>
                        )}
                    </>
                )}
            </ul>
        </nav>
    );
};

export default Header;
