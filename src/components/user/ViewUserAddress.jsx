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

