import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './index.css'

import Pc from './pc';
import Schoolwisepc from './schoolwisepc';

function Home() {
  const navigate = useNavigate();
  const [view, setView] = useState('pc');  // Default view is 'pc'

  const handleLogout = () => {
    navigate('/login'); // Redirect to login page after logout
  };

  const handlePCClick = () => {
    setView('pc'); // Change view to "PC"
  };

  const handleVideoClick = () => {
    setView('video'); // Change view to "Video"
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-success">
        <div className="container-fluid">
          <Link className="navbar-brand text-white" to="/home">DLAB ADMIN PANEL</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-auto">
              {/* <li className="nav-item">
                <Link className="nav-link text-white" aria-current="page" to="/home">Home</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-white" to="/about">About</Link>
              </li> */}
              <li className="nav-item">
                <button className="btn btn-link nav-link text-white" onClick={handlePCClick}>PC</button>
              </li>
              <li className="nav-item">
                <button className="btn btn-link nav-link text-white" onClick={handleVideoClick}>Video</button>
              </li>
            </ul>
            <ul className="navbar-nav">
              <li className="nav-item">
                <button className="btn btn-link nav-link text-white" onClick={handleLogout}>Logout</button>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <div className="container mt-3">
        {view === 'pc' ? (
          <div className="" role="alert">
             <Pc/>
          
             <Schoolwisepc/>
          </div>
        ) : (
          <div className="" role="alert">
            What's up
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;
