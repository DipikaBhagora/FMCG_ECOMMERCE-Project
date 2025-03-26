import React, { useState } from 'react';
import { Outlet, Link } from "react-router-dom";
import { UserNavbar } from './UserNavbar';

export const UserSidebar = () => {
  // For closing/opening sidebar
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  
  const toggleSidebar = () => {
    console.log("toggleSidebar");
    setSidebarOpen(!isSidebarOpen);
  };

  // Inline styles for the sidebar container
  const sidebarStyle = {
    width: "230px",
    transition: "all 0.3s ease",
    backgroundColor: "#343a40", // dark background for a modern look
    color: "#fff",
    position: "fixed",
    top: "0",
    bottom: "0",
    left: "0",
    overflowY: "auto",
    padding: "1rem",
    transform: isSidebarOpen ? "translateX(0)" : "translateX(-100%)"
  };

  // Inline styles for the brand section
  const brandStyle = {
    display: "flex",
    alignItems: "center",
    marginBottom: "2rem"
  };

  const brandLinkStyle = {
    display: "flex",
    alignItems: "center",
    textDecoration: "none",
    color: "inherit"
  };

  const brandImageStyle = {
    width: "40px",
    height: "40px",
    marginRight: "0.5rem"
  };

  const brandTextStyle = {
    fontSize: "1.25rem",
    fontWeight: "bold",
    color: "#fff"
  };

  // Inline styles for navigation list & items
  const navListStyle = {
    listStyle: "none",
    padding: 0,
    margin: 0
  };

  const navItemStyle = {
    marginBottom: "0.5rem"
  };

  const navLinkStyle = {
    display: "flex",
    alignItems: "center",
    color: "#c2c7d0",
    textDecoration: "none",
    padding: "0.5rem 1rem",
    borderRadius: "4px",
    transition: "background-color 0.2s ease"
  };

  const navIconStyle = {
    marginRight: "0.75rem",
    fontSize: "1.2rem"
  };

  const navTextStyle = {
    flex: 1
  };

  // Inline styles for main content area
  const mainStyle = {
    marginLeft: "250px",
    padding: "2rem",
    transition: "margin-left 0.3s ease"
  };

  return (
    <>
      <UserNavbar toggleSidebar={toggleSidebar} />
      <aside style={sidebarStyle} data-bs-theme="dark">
        <div style={brandStyle} className="sidebar-brand">
          <Link to="/profile" style={brandLinkStyle} className="brand-link">
            <img
              src="../../dist/assets/img/AdminLTELogo.png"
              alt="AdminLTE Logo"
              style={brandImageStyle}
              className="brand-image opacity-75 shadow"
            />
            <span style={brandTextStyle} className="brand-text fw-light">
              AdminLTE 4
            </span>
          </Link>
        </div>
        <div
          data-overlayscrollbars-viewport="scrollbarHidden overflowXHidden overflowYScroll"
          tabIndex={-1}
          style={{
            marginRight: "-16px",
            marginBottom: "-16px",
            marginLeft: 0,
            top: "-8px",
            right: "auto",
            left: "-8px",
            width: "calc(100% + 16px)",
            padding: 8
          }}
        >
          <nav className="mt-2">
            <ul
              style={navListStyle}
              className="nav sidebar-menu flex-column"
              data-lte-toggle="treeview"
              role="menu"
              data-accordion="false"
            >
              <li style={navItemStyle} className="nav-item menu-open">
                <Link to="profile" className="nav-link active" style={navLinkStyle}>
                  <i className="nav-icon bi bi-speedometer" style={navIconStyle}></i>
                  <span style={navTextStyle}>Profile</span>
                  <i className="nav-arrow bi bi-chevron-right"></i>
                </Link>
                <ul className="nav nav-treeview" style={{ paddingLeft: "1rem" }}>
                <li style={navItemStyle} className="nav-item">
                    <Link to="viewaddress" className="nav-link active" style={navLinkStyle}>
                      <i className="nav-icon bi bi-circle" style={navIconStyle}></i>
                      <span style={navTextStyle}>My Address</span>
                    </Link>
                  </li>
                  <li style={navItemStyle} className="nav-item">
                    <Link to="address" className="nav-link active" style={navLinkStyle}>
                      <i className="nav-icon bi bi-circle" style={navIconStyle}></i>
                      <span style={navTextStyle}>Add Address</span>
                    </Link>
                  </li>
                  <li style={navItemStyle} className="nav-item">
                    <Link to="/orders" className="nav-link" style={navLinkStyle}>
                      <i className="nav-icon bi bi-circle" style={navIconStyle}></i>
                      <span style={navTextStyle}>Orders</span>
                    </Link>
                  </li>
                  <li style={navItemStyle} className="nav-item">
                    <Link to="/cart" className="nav-link" style={navLinkStyle}>
                      <i className="nav-icon bi bi-circle" style={navIconStyle}></i>
                      <span style={navTextStyle}>Cart</span>
                    </Link>
                  </li>
                </ul>
              </li>
              <li style={navItemStyle} className="nav-item">
                <a href="./generate/theme.html" className="nav-link" style={navLinkStyle}>
                  <i className="nav-icon bi bi-palette" style={navIconStyle}></i>
                  <span style={navTextStyle}>Themes</span>
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </aside>
      <main style={mainStyle} className="app-main">
        <Outlet />
      </main>
    </>
  );
};

// import React, {useState} from 'react'
// import { UserNavbar } from './UserNavbar'
// import { Outlet } from "react-router-dom";
// import { Link } from 'react-router-dom';

// export const UserSidebar = () => {
//    //for closing sidebar
//     const [isSidebarOpen, setSidebarOpen] = useState(true);
  
//     const toggleSidebar = () => {
//       console.log("toggleSidebar");
//       setSidebarOpen(!isSidebarOpen);
//     };
//   return (
//   <>
//   <UserNavbar toggleSidebar={toggleSidebar}></UserNavbar>
//   <aside
//          className={`app-sidebar bg-body-secondary shadow ${
//           isSidebarOpen ? "open" : "d-none"
//         }`}
//         data-bs-theme = "dark"
//       >
//         <div className="sidebar-brand">
          
//           <a href="./index.html" className="brand-link">
            
//             <img
//               src="../../dist/assets/img/AdminLTELogo.png"
//               alt="AdminLTE Logo"
//               className="brand-image opacity-75 shadow"
//             />
            
//             <span className="brand-text fw-light">AdminLTE 4</span>
            
//           </a>
          
//         </div>

//         <div
//           className=""
//           data-overlayscrollbars-viewport="scrollbarHidden overflowXHidden overflowYScroll"
//           tabIndex={-1}
//           style={{
//             marginRight: "-16px",
//             marginBottom: "-16px",
//             marginLeft: 0,
//             top: "-8px",
//             right: "auto",
//             left: "-8px",
//             width: "calc(100% + 16px)",
//             padding: 8,
//           }}
//         >
//           <nav className="mt-2">
            
//             <ul
//               className="nav sidebar-menu flex-column"
//               data-lte-toggle="treeview"
//               role="menu"
//               data-accordion="false"
//             >
//               <li className="nav-item menu-open">
//                 <Link to="profile" className="nav-link active">
//                   <i className="nav-icon bi bi-speedometer" />
//                   <p>
//                     Profile
//                     <i className="nav-arrow bi bi-chevron-right" />
//                   </p>
//                 </Link>
//                 <ul className="nav nav-treeview">
//                   <li className="nav-item">
//                     <Link to="address" className="nav-link active">
//                       <i className="nav-icon bi bi-circle" />
//                       <p>Address</p>
//                     </Link>
//                   </li>
//                   <li className="nav-item">
//                     <Link to="/orders" className="nav-link">
//                       <i className="nav-icon bi bi-circle" />
//                       <p> orders</p>
//                     </Link>
//                   </li>
//                   <li className="nav-item">
//                     <Link to="/cart" className="nav-link">
//                       <i className="nav-icon bi bi-circle" />
//                       <p>Cart</p>
//                     </Link>
//                   </li>
//                 </ul>
//               </li>
//               <li className="nav-item">
//                 <a href="./generate/theme.html" className="nav-link">
//                   <i className="nav-icon bi bi-palette" />
//                   <p></p>
//                 </a>
//               </li>
             
               
//             </ul>
//           </nav>
//         </div>
//       </aside>
//       <main class="app-main">
//         <Outlet></Outlet>
//       </main>
//   </>
//   )
// }
