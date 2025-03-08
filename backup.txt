import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './Login.module.css'; 
import axios from 'axios';
import { ToastContainer, toast, Bounce} from 'react-toastify';

export const Login = () => {
  
  const navigate = useNavigate();  // Redirect after login
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState({});
  const [loading, setloading] = useState(false); //loading state

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    // setFormData({ ...formData, [name]: value });
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Form Validation
  const validateForm = () => {
    let newErrors = {};
    
    if (!formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      newErrors.email = 'Enter a valid email';
    }
    
    if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async(e) => {
    e.preventDefault();
    // if (validateForm()) {
    //   console.log("Form Submitted Data:", formData);
    //   alert("Login successful!");
    //   navigate('/user'); // Redirect to Dashboard
    // }

    if(!validateForm()) return;

    setloading(true); //start loading

    try{
      const res = await axios.post('/user/login',formData);
      console.log("API Response: ",res.data)
      
      if(res.status === 200){
          //alert("login successfully..");
                   // //localStorage.setItem("id",res.data.data._id)
            localStorage.setItem("id",JSON.stringify(res.data.data._id))
            localStorage.setItem("role", JSON.stringify(res.data.data.roleId.name));

            toast('🌟login successfully!', {
              position: "top-center",
              autoClose: 1000,
              hideProgressBar: false,
              closeOnClick: false,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "colored",
              transition: Bounce,
              onClose: () => {
                // navigate('/user/profile')
                setTimeout(() =>{
                  if(res.data.data.roleId.name === "CUSTOMER"){
                      navigate("/user/profile")
                    }
                    if(res.data.data.roleId.name === "ADMIN"){
                      navigate("/user")
                    }
                    if(res.data.data.roleId.name === "VENDOR"){
                      navigate("/vendor/demoform")
                    }
                }, 500)
              }
            });
            // //localStorage.setItem("id",res.data.data._id)
            // localStorage.setItem("id",JSON.stringify(res.data.data._id))
            // localStorage.setItem("role", JSON.stringify(res.data.data.roleId.name));

            // if(res.data.data.roleId.name === "CUSTOMER"){
            //   navigate("/user/profile")
            // }
            // if(res.data.data.roleId.name === "ADMIN"){
            //   navigate("/user")
            // }
            // if(res.data.data.roleId.name === "VENDOR"){
            //   navigate("/vendor/demoform")
            // }
          //delay to allow toaster to be visible
          // serTimeout(()=>{
          //   navigate('/user/profile');
          // },3000)
          
      }
      else{
        setErrors({
          general: "Invalid email or password"
        })
      }
    }
    catch(error){
      console.error("login Error: ", error.response?.data || error.message);
      setErrors({general: error.response?.data?.message || "Invalid credentials or service error"});
    }finally{
      setloading(false);
    }
    // catch(error){
    //     console.error("login Error: ",error);
    //     setErrors({
    //       general: "Invalid credentials or service error"});
    //     }finally {
    //       setloading(false); //stop loading
    //     }
  };

  return (
<>
<ToastContainer
position="top-center"
autoClose={3000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick={false}
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="dark"
transition={Bounce}
/>
    <div className={styles.loginContainer}>
      <form onSubmit={handleSubmit} className={styles.loginForm}>
        {errors.general && (<small className='text-danger d-block text-center'>{errors.general}</small>)}
        <h1 className={styles.loginTitle}>Sign In</h1>
        <hr />
        
        {errors.general && <small className={styles.errorText}>{errors.general}</small>}

        <div>
          <div className={styles.inputGroup}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"/>
            </svg>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              autoFocus
              required
            />
          </div>
          {errors.email && <small className={styles.errorText}>{errors.email}</small>}
        </div>

        <div>
          <div className={styles.inputGroup}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd"/>
            </svg>
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          {errors.password && <small className={styles.errorText}>{errors.password}</small>}
        </div>

        <button type="submit" className={styles.loginButton} disabled={loading}>
          {loading ? "Logging in..." : "Login"}</button>

        <hr />
        <p className={styles.registerText}>
          Don't have an account?
          <Link to="/signup"> Register now →</Link>
        </p>
      </form>
    </div>
    </> 
  );
};