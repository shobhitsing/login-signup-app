import React from 'react';
import { Train, Plane } from 'lucide-react';
import './Header.css';

const Header: React.FC = () => {
  return (
    <header className="header">
      <div className="header-container">
        <div className="logo">
          <div className="logo-icon">
            <Train size={24} />
            <Plane size={20} />
          </div>
          <h1>PNR Tracker</h1>
        </div>
        <nav className="nav">
          <ul className="nav-list">
            <li><a href="/" className="nav-link active">Home</a></li>
            <li><a href="#" className="nav-link">About</a></li>
            <li><a href="#" className="nav-link">Help</a></li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
