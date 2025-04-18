import React from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import signupImage from "../../assets/images/undraw_completed_0sqh.png";
import { ToastContainer, toast, Bounce } from "react-toastify";

export const Signup = () => {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  const submitHandler = async (data) => {
    try {
      //data.roleId = "67cbdf40c98099e54f8e961c";
      const res = await axios.post("/user/signup", data);
      console.log("API Response: ", res.data)

      if (res.status === 201) {
        // alert("User created successfully!");
        // navigate("/login");
        localStorage.setItem("id", JSON.stringify(res.data.data._id))
        // localStorage.setItem("role", JSON.stringify(res.data.data.roleId.name));

        toast('🌟USER created successfully!', {
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
            setTimeout(() => {
              navigate("/login");
            }, 500)
          }
        });

      } else {
        alert("User not created!");
      }
    } catch (error) {
      alert("Signup Failed");
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
        <div className="max-w-4xl w-full bg-white shadow-lg rounded-lg flex overflow-hidden h-[80vh]">

          {/* Left Section: Signup Form */}
          <div className="w-1/2 flex flex-col justify-center items-center p-10">
            <h1 className="text-3xl font-extrabold text-gray-900 mb-4">SIGN UP</h1>
            <form onSubmit={handleSubmit(submitHandler)} className="w-full flex flex-col items-center">
              <input
                className="w-full px-3 py-2 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 mb-3"
                type="text"
                {...register("firstName")}
                placeholder="First Name"
              />
              <input
                className="w-full px-3 py-2 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 mb-3"
                type="text"
                {...register("lastName")}
                placeholder="Last Name"
              />
              {/* <input
                className="w-full px-3 py-2 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 mb-3"
                type="number"
                {...register("age")}
                placeholder="Age"
              /> */}
              <input
                className="w-full px-3 py-2 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 mb-3"
                type="tel"
                {...register("number", {
                  required: "Phone number is required",
                  pattern: {
                    value: /^[0-9]{10}$/,
                    message: "Phone number must be 10 digits"
                  }
                })}
                placeholder="Phone Number"
              />
              <input
                className="w-full px-3 py-2 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 mb-3"
                type="email"
                {...register("email")}
                placeholder="Email"
              />
              <input
                className="w-full px-3 py-2 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 mb-3"
                type="password"
                {...register("password")}
                placeholder="Password"
              />
              <select
                {...register("roleId")}
                className="w-full px-3 py-2 rounded-lg border border-gray-300 text-sm text-gray-400  focus:outline-none focus:ring-2 focus:ring-indigo-500 mb-3"
              >
                <option value="">Select Role</option>
                <option value="67cbdf40c98099e54f8e961c">User</option>
                <option value="67cbdf15c98099e54f8e961a">Vendor</option>
                {/* <option value="67cbdf04c98099e54f8e9618">Admin</option> */}
              </select>
              <button
                type="submit"
                className="mt-4 w-full bg-indigo-500 text-white font-semibold py-3 rounded-lg hover:bg-indigo-700 flex items-center justify-center transition-all"
              >
                <svg
                  className="w-6 h-6 mr-2"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                  <circle cx="8.5" cy={7} r={4} />
                  <path d="M20 8v6M23 11h-6" />
                </svg>
                Sign Up
              </button>
            </form>
            <p className="mt-4 text-sm">
              Already have an account?
              <Link to="/login" className="text-indigo-600 font-medium hover:underline" style={{ textDecoration: "none" }}> Sign in</Link>
            </p>
          </div>

          {/* Right Section: Illustration */}
          <div className="w-3/5 hidden md:flex justify-center items-center p-4 h-full">
            <img
              src={signupImage}
              alt="Illustration"
              className="w-full h-full object-contain"
            />
          </div>
        </div>
      </div>
    </>
  );
};


