import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Home.css';

function Home() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear any stored data
    localStorage.removeItem('registeredEmail');
    // Redirect to login
    navigate('/login');
  };

  return (
    <div className="home-container">
      <div className="home-card">
        <h1>Welcome to Your Home Page</h1>
        <p>You have successfully logged in or completed your account setup!</p>
        <button onClick={handleLogout} className="logout-btn">
          Logout
        </button>
      </div>
    </div>
  );
}

export default Home;
