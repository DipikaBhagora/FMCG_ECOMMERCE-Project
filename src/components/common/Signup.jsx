import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./Signup.module.css";

export const Signup = () => {
  const navigate = useNavigate(); // Navigation after successful signup
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    agreeTerms: false,
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const validateForm = () => {
    let newErrors = {};

    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/))
      newErrors.email = "Enter a valid email";
    if (formData.password.length < 6)
      newErrors.password = "Password must be at least 6 characters";
    if (formData.password !== formData.confirmPassword)
      newErrors.confirmPassword = "Passwords do not match";
    if (!formData.agreeTerms)
      newErrors.agreeTerms = "You must agree to the terms";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      alert("Signup successful!");
      console.log("Submitted Data:", formData);
      navigate("/login"); // Redirect to Login page
    }
  };

  return (
    <section className="vh-100 glitter-background d-flex align-items-center justify-content-center">
      <div className="container">
        <div className="row d-flex justify-content-center align-items-center">
          <div className="col-lg-10 col-xl-9">
            <div className="card text-black glitter-card">
              <div className="card-body p-md-4">
                <div className="row justify-content-center">
                  <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                    <p className="text-center h1 fw-bold mb-4">Sign up</p>
                    <form className="mx-1 mx-md-4" onSubmit={handleSubmit}>
                      <div className="mb-3">
                        <label className="form-label">Your Name</label>
                        <input
                          type="text"
                          name="name"
                          className="form-control"
                          placeholder="Enter your name"
                          value={formData.name}
                          onChange={handleChange}
                          autoFocus
                        />
                        {errors.name && (
                          <small className="text-danger">{errors.name}</small>
                        )}
                      </div>
                      <div className="mb-3">
                        <label className="form-label">Your Email</label>
                        <input
                          type="email"
                          name="email"
                          className="form-control"
                          placeholder="Enter your email"
                          value={formData.email}
                          onChange={handleChange}
                        />
                        {errors.email && (
                          <small className="text-danger">{errors.email}</small>
                        )}
                      </div>
                      <div className="mb-3">
                        <label className="form-label">Password</label>
                        <input
                          type="password"
                          name="password"
                          className="form-control"
                          placeholder="Enter your password"
                          value={formData.password}
                          onChange={handleChange}
                        />
                        {errors.password && (
                          <small className="text-danger">{errors.password}</small>
                        )}
                      </div>
                      <div className="mb-3">
                        <label className="form-label">Confirm Password</label>
                        <input
                          type="password"
                          name="confirmPassword"
                          className="form-control"
                          placeholder="Confirm your password"
                          value={formData.confirmPassword}
                          onChange={handleChange}
                        />
                        {errors.confirmPassword && (
                          <small className="text-danger">{errors.confirmPassword}</small>
                        )}
                      </div>
                      <div className="form-check d-flex justify-content-center mb-4">
                        <input
                          className="form-check-input me-2"
                          type="checkbox"
                          name="agreeTerms"
                          checked={formData.agreeTerms}
                          onChange={handleChange}
                        />
                        <label className="form-check-label">
                          I agree to all statements in{" "}
                          <a href="#!">Terms of service</a>
                        </label>
                      </div>
                      {errors.agreeTerms && (
                        <small className="text-danger d-block text-center">
                          {errors.agreeTerms}
                        </small>
                      )}
                      <div className="d-flex justify-content-center mx-4 mb-3">
                        <button type="submit" className="btn btn-primary btn-lg glitter-button">
                          Register
                        </button>
                      </div>
                    </form>
                    <div className="text-center">
                      <p>
                        Already have an account?{" "}
                        <Link to="/login" className="text-primary fw-bold">Login here</Link>
                      </p>
                    </div>
                  </div>
                  <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">
                    <img
                      src="https://img.freepik.com/premium-vector/businessman-signing-contract-with-digital-pen-phone-screen-electronic-contract-with-digital-signature-businessmen-make-online-deal-with-esignature-agreement-conclusion-business-partnership_458444-1236.jpg"
                      className="img-fluid w-100 rounded"
                      alt="Sample"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
