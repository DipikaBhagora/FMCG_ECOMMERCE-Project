import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const ViewUserAddress = () => {

  const navigate = useNavigate();
  const [userAddress, setUserAddress] = useState(null); // Store a single address

  useEffect(() => {
    fetchUserAddress();
  }, []);

  const fetchUserAddress = async () => {
    try {
      const userId = localStorage.getItem("id");
      const res = await axios.get(`/address/getaddressbyuserid/${userId}`);

      console.log("API Response:", res.data);

      if (res.data?.data?.length > 0) {
        setUserAddress(res.data.data[0]); // Store first address
      } else {
        setUserAddress(null);
      }
    } catch (error) {
      console.error("Error fetching user address:", error);
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card p-4 shadow">
            <h2 className="text-center mb-4">User Address</h2>

            {userAddress ? (
              <div className="mb-3">
                <h5 className="mb-3">📍 Address Details:</h5>
                <ul className="list-group">
                  <li className="list-group-item"><strong>Title:</strong> {userAddress.title}</li>
                  <li className="list-group-item"><strong>Unit Name:</strong> {userAddress.unitName}</li>
                  <li className="list-group-item"><strong>Street:</strong> {userAddress.street}</li>
                  <li className="list-group-item"><strong>Landmark:</strong> {userAddress.landMark}</li>
                  <li className="list-group-item"><strong>City:</strong> {userAddress.cityId?.name}</li>
                  <li className="list-group-item"><strong>State:</strong> {userAddress.stateId?.name}</li>
                  <li className="list-group-item"><strong>Zip Code:</strong> {userAddress.zipCode}</li>
                  <li className="list-group-item"><strong>Full Address:</strong> {userAddress.addressDetail}</li>
                </ul>
              </div>
            ) : (
              <p className="text-muted">No address found. Please add one.</p>
            )}

            <button
              className="btn btn-primary mt-3 w-100"
              onClick={() => {
                if (userAddress && userAddress._id) {
                  navigate(`/user/updateaddress/${userAddress._id}`);
                } else {
                  navigate("/user/addaddress");
                }
              }}
            >
              {userAddress ? "✏️ Edit Address" : "➕ Add Address"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};


// import React, { useEffect, useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import { useForm } from "react-hook-form";
// import axios from "axios";

// export const UpdateUserAddress = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const { register, handleSubmit, setValue } = useForm();
  
//   const [cities, setCities] = useState([]);
//   const [states, setStates] = useState([]);

//   useEffect(() => {
//     fetchStates();
//     fetchAddress();
//   }, []);

//   const fetchStates = async () => {
//     try {
//       const res = await axios.get("/state/getallstates");
//       setStates(res.data.data);
//     } catch (error) {
//       console.error("Error fetching states:", error);
//     }
//   };

//   const fetchCities = async (stateId) => {
//     try {
//       const res = await axios.get(`/city/getcitybystate/${stateId}`);
//       setCities(res.data.data);
//     } catch (error) {
//       console.error("Error fetching cities:", error);
//     }
//   };

//   const fetchAddress = async () => {
//     try {
//       const res = await axios.get(`/address/getaddressbyid/${id}`);
//       const addressData = res.data.data;

//       if (addressData) {
//         setValue("title", addressData.title);
//         setValue("unitName", addressData.unitName);
//         setValue("street", addressData.street);
//         setValue("landMark", addressData.landMark);
//         setValue("stateId", addressData.stateId._id);
//         setValue("cityId", addressData.cityId._id);
//         setValue("addressDetail", addressData.addressDetail);
//         setValue("zipCode", addressData.zipCode);

//         fetchCities(addressData.stateId._id); // Load cities when state is preselected
//       }
//     } catch (error) {
//       console.error("Error fetching address:", error);
//     }
//   };

//   const handleStateChange = (event) => {
//     const stateId = event.target.value;
//     fetchCities(stateId);
//   };

//   const submitHandler = async (data) => {
//     try {
//       data.userId = localStorage.getItem("id");

//       const res = await axios.put(`/address/updateaddress/${id}`, data);
      
//       if (res.data.message.includes("successfully")) {
//         alert("Address updated successfully!");
//         navigate("/user/profile");
//       } else {
//         alert(`Error: ${res.data.message || "Failed to update address"}`);
//       }
//     } catch (error) {
//       console.error("Error updating address:", error);
//       alert(`Something went wrong: ${error.response?.data?.message || error.message}`);
//     }
//   };

//   return (
//     <div className="container mt-5">
//       <div className="row justify-content-center">
//         <div className="col-md-8">
//           <div className="card p-4 shadow">
//             <h2 className="text-center mb-4">Update Address</h2>
//             <form onSubmit={handleSubmit(submitHandler)}>
//               <div className="mb-3">
//                 <label className="form-label">Title:</label>
//                 <input type="text" className="form-control" {...register("title")} />
//               </div>
//               <div className="mb-3">
//                 <label className="form-label">Unit Name:</label>
//                 <input type="text" className="form-control" {...register("unitName")} />
//               </div>
//               <div className="mb-3">
//                 <label className="form-label">Street:</label>
//                 <input type="text" className="form-control" {...register("street")} />
//               </div>
//               <div className="mb-3">
//                 <label className="form-label">Landmark:</label>
//                 <input type="text" className="form-control" {...register("landMark")} />
//               </div>
//               <div className="mb-3">
//                 <label className="form-label">State:</label>
//                 <select className="form-select" {...register("stateId")} onChange={handleStateChange}>
//                   <option>SELECT STATE</option>
//                   {states?.map((state) => (
//                     <option key={state._id} value={state._id}>{state.name}</option>
//                   ))}
//                 </select>
//               </div>
//               <div className="mb-3">
//                 <label className="form-label">City:</label>
//                 <select className="form-select" {...register("cityId")}>
//                   <option>SELECT CITY</option>
//                   {cities?.map((city) => (
//                     <option key={city._id} value={city._id}>{city.name}</option>
//                   ))}
//                 </select>
//               </div>
//               <div className="mb-3">
//                 <label className="form-label">Address Detail:</label>
//                 <textarea className="form-control" {...register("addressDetail")} />
//               </div>
//               <div className="mb-3">
//                 <label className="form-label">Zip Code:</label>
//                 <input type="number" className="form-control" {...register("zipCode")} />
//               </div>
//               <button type="submit" className="btn btn-primary w-100">Update Address</button>
//             </form>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

