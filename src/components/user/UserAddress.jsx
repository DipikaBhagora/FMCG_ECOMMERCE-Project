import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

export const UserAddress = () => {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  
  const [cities, setCities] = useState([]);
  const [states, setStates] = useState([]);

  useEffect(() => {
    fetchStates();
  }, []);

  const fetchCities = async (stateId) => {
    try {
      const res = await axios.get(`/city/getcitybystate/${stateId}`);
      console.log("Cities response:",res.data)
      setCities(res.data.data);
    } catch (error) {
      console.error("Error fetching cities:", error);
    }
  };

  const fetchStates = async () => {
    try {
      const res = await axios.get("/state/getallstates");
      console.log(res.data)
      setStates(res.data.data);
    } catch (error) {
      console.error("Error fetching states:", error);
    }
  };

  const handleStateChange = (event) => {
    const stateId = event.target.value;
    fetchCities(stateId);
  };

  const submitHandler = async (data) => {
    try {
      const userId = localStorage.getItem("id");
      data.userId = userId;

      const res = await axios.post("/address/addaddress", data);
      
      console.log("API Response:",res.data);

      if (res.data.message.includes("successfully")) {
        alert("Address added successfully!");
        navigate("/user/address");
      } else {
        alert(`Error: ${res.data.message || "Failed to add address"}`);
      }
    } catch (error) {
      console.error("Error:", error);
      alert(`Something went wrong: ${error.response?.data?.message || error.message}`);
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card p-4 shadow">
            <h2 className="text-center mb-4 fw-bold text-3xl">Add Address</h2>
            <form onSubmit={handleSubmit(submitHandler)}>
              <div className="mb-3">
                <label className="form-label">Title:</label>
                <input type="text" className="form-control" {...register("title")} />
              </div>
              <div className="mb-3">
                <label className="form-label">Unit Name:</label>
                <input type="text" className="form-control" {...register("unitName")} />
              </div>
              <div className="mb-3">
                <label className="form-label">Street:</label>
                <input type="text" className="form-control" {...register("street")} />
              </div>
              <div className="mb-3">
                <label className="form-label">Landmark:</label>
                <input type="text" className="form-control" {...register("landMark")} />
              </div>
              <div className="mb-3">
                <label className="form-label">State:</label>
                <select className="form-select" {...register("stateId")} onChange={handleStateChange}>
                  <option>SELECT STATE</option>
                  {states?.map((state) => (
                    <option key={state._id} value={state._id}>{state.name}</option>
                  ))}
                </select>
              </div>
              <div className="mb-3">
                <label className="form-label">City:</label>
                <select className="form-select" {...register("cityId")}>
                  <option>SELECT CITY</option>
                  {cities?.map((city) => (
                    <option key={city._id} value={city._id}>{city.name}</option>
                  ))}
                </select>
              </div>
              <div className="mb-3">
                <label className="form-label">Address Detail:</label>
                <textarea className="form-control" {...register("addressDetail")} />
              </div>
              <div className="mb-3">
                <label className="form-label">Zip Code:</label>
                <input type="number" className="form-control" {...register("zipCode")} />
              </div>
              <button type="submit" className="btn btn-primary w-100">Submit</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
