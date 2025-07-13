import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  return (
    <nav className="bg-blue-800 text-white p-4 flex justify-between">
      <h1 className="text-lg font-bold">
        <Link to="/">My Library</Link>
      </h1>
      <div className="space-x-4">
        <Link to="/">Home</Link>
        {user && <Link to="/mybooks">My Books</Link>}
        {user && <Link to="/add-book">Add Book</Link>}
        {!user && <Link to="/login">Login</Link>}
        {!user && <Link to="/register">Register</Link>}
        {user && (
          <>
            <span>{user.email}</span>
            <button onClick={handleLogout} className="ml-2 underline">Logout</button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;