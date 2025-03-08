import { UserSidebar } from './components/layouts/UserSidebar'
import { Route,Routes, useLocation } from 'react-router-dom'
import { UserProfile } from './components/user/UserProfile'
import './assets/adminlte.css'
import './assets/adminlte.min.css'
import { Signup } from './components/common/Signup'
import { Login } from './components/common/Login'
import axios from 'axios'
import { useState, useEffect } from "react";

function App() {

  axios.defaults.baseURL = "http://localhost:3000";

  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/login" || location.pathname === "/signup") {
      document.body.className = ""; // Remove the unwanted class for login and signup
    } else {
      document.body.className =
        "layout-fixed sidebar-expand-lg bg-body-tertiary sidebar-open app-loaded";
    }
  }, [location.pathname]);

  return (
<>
<div
      className={
        location.pathname === "/login" || location.pathname === "/signup"
          ? ""
          : "app-wrapper"
      }
    >

  <Routes>

    <Route path='/login' element={<Login/>}></Route>
    <Route path='/signup' element={<Signup/>}></Route>

    <Route path='/user' element={<UserSidebar/>}>
    <Route path='profile' element={<UserProfile/>}></Route>
    </Route>
  </Routes>

    </div>
    </>
  )
}

export default App
