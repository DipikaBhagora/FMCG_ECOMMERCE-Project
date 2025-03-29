import axios from "axios";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";

export const UpdateUserAddress = () => {
  const { id } = useParams(); // Get address ID from URL
  const { register, handleSubmit, setValue } = useForm();
  const navigate = useNavigate();

  const [cities, setCities] = useState([]);
  const [states, setStates] = useState([]);

  useEffect(() => {
    fetchStates();
    fetchAddress();
  }, [id]);

  // Fetch address data
  const fetchAddress = async () => {
    try {
      const res = await axios.get(`/address/getaddressbyid/${id}`);
      if (res.data && res.data.data) {
        const address = res.data.data;
        console.log("Fetched Address:", address);
        
        // Pre-fill form fields with address data
        Object.keys(address).forEach((key) => setValue(key, address[key]));

        // Fetch cities based on the stored stateId
        if (address.stateId && address.stateId._id) {
          fetchCities(address.stateId._id);
          setValue("stateId", address.stateId._id); // Ensure state is selected
        }

        // Ensure city selection
        if (address.cityId && address.cityId._id) {
          setValue("cityId", address.cityId._id);
        }
      }
    } catch (error) {
      console.error("Error fetching address:", error);
      alert("Failed to load address data.");
    }
  };

  // Fetch all states
  const fetchStates = async () => {
    try {
      const res = await axios.get("/state/getallstates");
      setStates(res.data.data);
    } catch (error) {
      console.error("Error fetching states:", error);
    }
  };

  // Fetch cities based on selected state
  const fetchCities = async (stateId) => {
    try {
      const res = await axios.get(`/city/getcitybystate/${stateId}`);
      setCities(res.data.data);
    } catch (error) {
      console.error("Error fetching cities:", error);
    }
  };

  // Handle state selection change
  const handleStateChange = (event) => {
    const stateId = event.target.value;
    setValue("stateId", stateId);
    fetchCities(stateId);
  };

  // Handle form submission
  const submitHandler = async (data) => {
    try {
      data.userId = localStorage.getItem("id");
      delete data._id; // Remove _id before sending update request

      const res = await axios.put(`/address/updateaddress/${id}`, data);
      console.log("Update Response:", res.data);

      alert("Address updated successfully!");
      navigate("/user/profile");
    } catch (error) {
      console.error("Error updating address:", error);
      alert(`Failed to update address: ${error.response?.data?.message || error.message}`);
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card p-4 shadow">
            <h2 className="text-center mb-4">Update Address</h2>
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
                  <option value="">SELECT STATE</option>
                  {states?.map((state) => (
                    <option key={state._id} value={state._id}>{state.name}</option>
                  ))}
                </select>
              </div>
              <div className="mb-3">
                <label className="form-label">City:</label>
                <select className="form-select" {...register("cityId")}>
                  <option value="">SELECT CITY</option>
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
              <button type="submit" className="btn btn-primary w-100">Update Address</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

