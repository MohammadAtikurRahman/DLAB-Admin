import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './index.css';

import Pc from './pc';
import Schoolwisepc from './schoolwisepc';
import Video from './video';
import SchoolwiseVideo from './schoolwisevideo';

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
    <div className="d-flex">
      <div className="sidebar bg-dark">
        <div className="sidebar-header" style={{ padding: "11.5px", borderBottom: "none"}}>
          <h5 style={{color:"white"}}>DLAB</h5>
        </div>
        <div className="list-group text-center p-3">
          <button className="btn  list-group-item list-group-item-action" onClick={handlePCClick}>PC</button>
          <br/>
          <button className="btn list-group-item list-group-item-action" onClick={handleVideoClick}>Video</button>
      
          <br/>
          <button className="btn list-group-item list-group-item-action" onClick={handleVideoClick}>Interval</button>
             
          <br/>
          <button className="btn list-group-item list-group-item-action" onClick={handleVideoClick}>School Map</button>
      


        </div>
      </div>
      <div className="main-content flex-grow-1">
        <nav className="navbar navbar-expand-lg navbar-light bg-danger">
          <div className="container-fluid">
            <Link className="navbar-brand text-white" to="/home">ADMIN PANEL</Link>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav ms-auto">
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
              <Video/>
              <SchoolwiseVideo/>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;
