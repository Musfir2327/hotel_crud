import React, { useEffect, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import AdminDashboard from './components/AdminDashboard';
import CarView from './components/CarView';
import EmplDashboard from './components/Employee/Employee-dashboard/EmplDashboard';
import EditEmployee from './components/Employee/employee/EditEmployee';
import PostUser from './components/Employee/employee/PostUser';
import Emplview from './components/EmployeeView';
import EventDashboard from './components/Event/Event-dashboard/EventDashboard';
import PostEvents from './components/Event/events/PostEvents';
import UpdateEvent from './components/Event/events/UpdateEvent';
import EventView from './components/EventView';
import AddFood from './components/Food/AddFood';
import ManageFood from './components/Food/ManageFood';
import UpdateFood from './components/Food/updateFood';
import FoodView from './components/FoodView';
import Header from './components/Header';
import Home from './components/Home';
import Login from './components/Login';
import Dashboard from './components/pages/Car-dashboard/CarDashboard';
import PostCar from './components/pages/Car/PostCar';
import UpdateCar from './components/pages/Car/UpdateCar';
import NoMatch from './components/pages/noMatch/NoMatch';
import Sidebar from './components/pages/SideBar/Sidebar';
import Signup from './components/Signup';
import UserDashboard from './components/UserDashboard';
import CreateRoom from './components/Room/CreateRoom';
import ViewRooms from './components/Room/ViewRooms';
import UpdateRoom from './components/Room/UpdateRoom';  
import RoomList from './components/Roomlist';

const App = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [showHamburgerMenu, setShowHamburgerMenu] = useState(false);
    const [showSidebar, setShowSidebar] = useState(false);
    const [currentMenu, setCurrentMenu] = useState(null);
    const location = useLocation();

    useEffect(() => {
        const token = localStorage.getItem('token');
        const userRole = localStorage.getItem('userRole');
        const hamburgerMenuState = localStorage.getItem('showHamburgerMenu') === 'true';

        if (token) {
            setIsAuthenticated(true);
            if (userRole === 'Admin') {
                setShowHamburgerMenu(hamburgerMenuState);
            }
        }
    }, [location.pathname]);

    const toggleSidebar = () => {
        setShowSidebar((prevState) => !prevState);
    };

    const toggleHamburgerMenu = (state) => {
        setShowHamburgerMenu(state);
        localStorage.setItem('showHamburgerMenu', state);
    };

    return (
        <>
            <Header
                isAuthenticated={isAuthenticated}
                setIsAuthenticated={setIsAuthenticated}
                showHamburgerMenu={showHamburgerMenu}
                toggleSidebar={toggleSidebar}
            />
            <Sidebar showSidebar={showSidebar} currentMenu={currentMenu} />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} setShowHamburgerMenu={setShowHamburgerMenu} />} />
                <Route
                    path="/admin-dashboard"
                    element={<AdminDashboard setShowHamburgerMenu={toggleHamburgerMenu} setCurrentMenu={setCurrentMenu} />}
                />
                <Route path="/user-dashboard" element={<UserDashboard />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/car" element={<PostCar />} />
                <Route path="/view" element={<CarView />} />
                <Route path="/e-view" element={<EventView />} />
                <Route path="/F-view" element={<FoodView />} />
                <Route path="/car/:id" element={<UpdateCar />} />
                <Route path="/admin" element={<EventDashboard />} />
                <Route path="/events" element={<PostEvents />} />
                <Route path="/event/:id" element={<UpdateEvent />} />
                <Route path="*" element={<NoMatch />} />
                <Route path="/add" element={<AddFood />} />
                <Route path="/update" element={<UpdateFood />} />
                <Route path="/manage-food" element={<ManageFood />} />
                <Route path="/Edash" element={<EmplDashboard />} />
                <Route path="/employee" element={<PostUser />} />
                <Route path="/employee/:id" element={<EditEmployee />} />
                <Route path="/empView" element={<Emplview />} />
                <Route path="/creat" element={<CreateRoom />} />
                <Route path="/update-room/:roomId" element={<UpdateRoom />} />
                <Route path="/view-rooms" element={<ViewRooms />} />
                <Route path="/roomlist" element={<RoomList />} />
            </Routes>
        </>
    );
};

export default App;
