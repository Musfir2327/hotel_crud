import React from "react";
import { Link } from "react-router-dom";
import "./Sidebar.css"; // Keep using the existing custom styles

const Sidebar = ({ showSidebar, currentMenu }) => {
    const carMenu = (
        <div className="sidebar-menu">
            <Link to="/dashboard" className="sidebar-link">
                Car Dashboard
            </Link>
            <Link to="/car" className="sidebar-link">
                Post New Car
            </Link>
        </div>
    );

    const eventMenu = (
        <div className="sidebar-menu">
            <Link to="/admin" className="sidebar-link">
                Event Dashboard
            </Link>
            <Link to="/events" className="sidebar-link">
                Post New Event
            </Link>
        </div>
    );

    const foodMenu = (
        <div className="sidebar-menu">
            <Link to="/manage-food" className="sidebar-link">
                Food Dashboard
            </Link>
            <Link to="/add" className="sidebar-link">
                Post New Food
            </Link>
        </div>
    );

    const employeeMenu = (
        <div className="sidebar-menu">
            <Link to="/Edash" className="sidebar-link">
                Employee Dashboard
            </Link>
            <Link to="/employee" className="sidebar-link">
                Post New Employee
            </Link>
        </div>
    );

    const roomMenu = (
        <div className="sidebar-menu">
            <Link to="/view-rooms" className="sidebar-link">
                Room Dashboard
            </Link>
            <Link to="/creat" className="sidebar-link">
                Post New Room
            </Link>
        </div>
    );

    return (
        <div
            className={`sidebar ${showSidebar ? "visible" : "hidden"}`}
        >
            {/* Admin Menu at the top */}
            <div className="sidebar-brand">
                <strong>Admin Menu</strong>
            </div>

            {/* Dynamic Menu Rendering */}
            {currentMenu === "Car" && carMenu}
            {currentMenu === "Event" && eventMenu}
            {currentMenu === "Food" && foodMenu}
            {currentMenu === "Employee" && employeeMenu}
            {currentMenu === "Room" && roomMenu}
        </div>
    );
};

export default Sidebar;
