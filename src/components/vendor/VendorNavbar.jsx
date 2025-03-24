import React from 'react';
import hamburgermenu from '../../assets/images/hamburgermenu.png';
import { useNavigate } from 'react-router-dom';

export const VendorNavbar = ({ toggleSidebar }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear stored authentication data
    localStorage.removeItem('token');
    localStorage.removeItem('id');
    localStorage.removeItem('user');
    sessionStorage.clear();

    // Redirect to login page
    navigate('/login');
  };

  return (
    <nav className="app-header navbar navbar-expand bg-body">
      {/* begin::Container */}
      <div className="container-fluid">
        <ul className="navbar-nav">
          <li className="nav-item">
            <a
              className="nav-link btn btn-light"
              href="#"
              role="button"
              style={{
                color: "black",
                padding: "5px 10px",
                border: "1px solid #ccc",
                borderRadius: "5px",
              }}
              onClick={toggleSidebar}
            >
              <img
                src={hamburgermenu}
                style={{ height: "25px", width: "25px" }}
                alt="Menu"
              />
            </a>
          </li>
          <li className="nav-item d-none d-md-block">
            <a href="#" className="nav-link">
              Home
            </a>
          </li>
          <li className="nav-item d-none d-md-block">
            <a href="#" className="nav-link">
              Contact
            </a>
          </li>
        </ul>

        <ul className="navbar-nav ms-auto">
          <li className="nav-item">
            <a
              className="nav-link"
              data-widget="navbar-search"
              href="#"
              role="button"
            >
              <i className="bi bi-search" />
            </a>
          </li>

          <li className="nav-item">
            <button className="btn btn-danger" onClick={handleLogout}>
              LOGOUT
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
};
