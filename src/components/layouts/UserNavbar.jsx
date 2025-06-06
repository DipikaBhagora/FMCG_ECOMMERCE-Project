import React from "react";
import { useNavigate, Link } from "react-router-dom";
import hamburgermenu from "../../assets/images/hamburgermenu.png";

export const UserNavbar = ({ toggleSidebar }) => {
  const navigate = useNavigate();

  // const handleLogout = () => {

  //   // Clear Redux states
  //   dispatch(clearCart());
  //   dispatch(clearWishlist());

  //   //localStorage.removeItem("token"); // Remove JWT token
  //   localStorage.removeItem("id"); // Remove user ID
  //   localStorage.removeItem("role"); // Remove user details
  //   localStorage.removeItem("cart");
  //   localStorage.removeItem("wishlist");
  //   sessionStorage.clear(); // Clear sessionStorage if used
    
  //   // Hard reload to reset persisted states and redirect
  //   window.location.href = "/login";

  //   // Redirect to login page
  //   //navigate("/login");
  // };

  // Inline styles for the navbar container
  const navbarStyle = {
    position: "fixed",
    top: 0,
    width: "100%",
    zIndex: 1000,
    backgroundColor: "#fff",
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
    padding: "0.5rem 1rem"
  };

  // Inline style for nav links
  const navLinkStyle = {
    textDecoration: "none",
    color: "inherit"
  };

  return (
    <nav style={navbarStyle} className="app-header navbar navbar-expand bg-body">
      <div className="container-fluid">
        <ul className="navbar-nav">
          <li className="nav-item">
            <button
              className="nav-link btn btn-light"
              role="button"
              style={{
                color: "black",
                padding: "5px 10px",
                border: "1px solid #ccc",
                borderRadius: "5px",
                background: "white"
              }}
              onClick={toggleSidebar}
            >
              <img
                src={hamburgermenu}
                alt="Menu"
                style={{ height: "25px", width: "25px" }}
              />
            </button>
          </li>
          <li className="nav-item d-none d-md-block">
            <Link to="/" className="nav-link" style={navLinkStyle}>
              Home
            </Link>
          </li>
          {/* <li className="nav-item d-none d-md-block">
            <Link to="contactustovendor" className="nav-link" style={navLinkStyle}>
              Contact
            </Link>
          </li> */}
        </ul>

        <ul className="navbar-nav ms-auto">
          <li className="nav-item">
            <a
              className="nav-link"
              data-widget="navbar-search"
              href="#"
              role="button"
              style={navLinkStyle}
            >
              <i className="bi bi-search" />
            </a>
          </li>
          <li className="nav-item">
  <Link
    to="/logout"
    className="btn btn-danger"
    style={{ marginLeft: "1rem" }}
  >
    LOGOUT
  </Link>
</li>
        </ul>
      </div>
    </nav>
  );
};
