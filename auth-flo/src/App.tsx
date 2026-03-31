import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import SetupAccount from './pages/SetupAccount';
import Home from './pages/Home';
import { useTheme } from './theme/ThemeContext';
import './App.css';

const App: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="App">
      <header className="app-header">
        <button className="theme-toggle" onClick={toggleTheme}>
          {theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
        </button>
      </header>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/setup-account" element={<SetupAccount />} />
          <Route path="/home" element={<Home />} />
          <Route path="/" element={<Navigate to="/login" replace />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
