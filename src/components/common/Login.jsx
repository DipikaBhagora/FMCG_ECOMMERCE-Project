import React from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import loginImage from "../../assets/images/undraw_access-account_aydp.png"; // Correct image import
import { ToastContainer, toast, Bounce } from "react-toastify";

export const Login = () => {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  const submitHandler = async (data) => {
    try {
      const res = await axios.post("/user/login", data);
      console.log("API Response: ",res.data);

      if (res.status === 200) {
        // alert("Login successful!");
        // navigate("/user");
        localStorage.setItem("id",res.data.data._id)
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
            setTimeout(() =>{
              if(res.data.data.roleId.name === "CUSTOMER"){
                  navigate("/user")
                }
                if(res.data.data.roleId.name === "ADMIN"){
                  navigate("/user")
                }
                if(res.data.data.roleId.name === "VENDOR"){
                  navigate("/vendor")
                }
            }, 500)
          }
        });
      } else {
        alert("Invalid credentials!");
      }
    } catch (error) {
      alert("Login Failed");
    }
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
    <div className="h-screen bg-gradient-to-r from-blue-300 via-blue-500 to-purple-600 flex justify-center items-center">
      <div className="max-w-4xl w-full bg-white shadow-lg rounded-lg flex overflow-hidden">
        
        {/* Left Section: Login Form */}
        <div className="w-1/2 flex flex-col justify-center items-center p-12">
          <h1 className="text-3xl font-extrabold text-gray-900 mb-6">LOGIN</h1>
          <form onSubmit={handleSubmit(submitHandler)} className="w-full max-w-sm">
            <input
              className="w-full px-6 py-3 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 mb-4"
              type="email"
              {...register("email")}
              placeholder="Email"
              required
            />
            <input
              className="w-full px-6 py-3 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 mb-4"
              type="password"
              {...register("password")}
              placeholder="Password"
              required
            />
            <button
              type="submit"
              className="mt-4 w-full bg-indigo-500 text-white font-semibold py-3 rounded-lg hover:bg-indigo-700 flex items-center justify-center transition-all"
            >
              Sign In
            </button>
          </form>
          
          <p className="mt-4 text-sm">
            Don't have an account?
            <Link to="/signup" className="text-indigo-600 font-medium hover:underline" style={{textDecoration: "none"}}> Register</Link>
          </p>
        </div>

        {/* Right Section: Illustration */}
        <div className="w-3/5 hidden lg:flex justify-center items-center bg-indigo-100">
           <img
             src={loginImage}
             alt="Illustration"
             className="object-contain w-full h-full"
           />
         </div>

      </div>
    </div>
    </>
  );
};



