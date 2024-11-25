import React from 'react';
import { Link } from 'react-router-dom';
import './UserDashboard.css';

const Dashboard = () => {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap', padding: '50px',gap:'40px', }}>
      <Link to="/view">
        <img
          src="https://cdn.pixabay.com/photo/2012/11/02/13/02/car-63930_1280.jpg"
          alt="Car"
          style={{ width: '300px', height: '250px', borderRadius: '10px', cursor: 'pointer' }}
        />
         <h1>Car</h1>
      </Link>

      <Link to="/e-view">
        <img
          src="https://th.bing.com/th/id/R.c15e981c74f5ac5755e179777cf958d6?rik=3hYEBUAvIMMXhw&pid=ImgRaw&r=0"
          alt="Event"
          style={{ width: '250px', height: '250px', borderRadius: '10px', cursor: 'pointer' }}
        />
        <h1>Event</h1>
      </Link>

      <Link to="/F-view">
        <img
          src="https://th.bing.com/th/id/R.8d84f8ed28ab6688e63794a96199019c?rik=pZpEqB24NzYPwQ&pid=ImgRaw&r=0"
          alt="Food Menu"
          style={{ width: '300px', height: '250px', borderRadius: '10px', cursor: 'pointer' }}
        />
         <h1>Food Order</h1>
      </Link>

      <Link to="/empview">
        <img
          src="https://www.cvent.com/sites/default/files/image/2021-07/smiling%20hotel%20employee%20leaving%20positive%20first%20impression%20on%20guests.jpg"
          alt="Employee"
          style={{ width: '300px', height: '250px', borderRadius: '10px', gap: '30px',cursor: 'pointer' }}
        />
         <h1>Hotel Employees</h1>
      </Link>

      <Link to="/roomlist">
        <img
          src="https://th.bing.com/th/id/R.d34db9f2f0b63f077cfaf4a18351a9a9?rik=qA4WpvXTtbZUWg&pid=ImgRaw&r=0"
          alt="Rooms"
          style={{ width: '300px', height: '250px', borderRadius: '10px', gap: '30px', cursor: 'pointer' }}
        />
         <h1>Rooms</h1>
      </Link>
    </div>
  );
};

export default Dashboard;
