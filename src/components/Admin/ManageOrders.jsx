import React, { useEffect, useState } from "react";
import { FaEye, FaEdit, FaTrash } from "react-icons/fa";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

const StatusBadge = ({ status }) => {
  const statusColor =
    status === "Pending"
      ? "bg-yellow-100 text-yellow-700"
      : status === "Shipped"
        ? "bg-blue-100 text-blue-700"
        : status === "Delivered"
          ? "bg-green-100 text-green-700"
          : "bg-red-100 text-red-700";

  return (
    <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusColor}`}>
      {status}
    </span>
  );
};

export const ManageOrders = () => {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  const fetchOrders = async () => {
    try {
      const res = await axios.get("/orders/getorders");
      setOrders(res.data.data); // store fetched orders
    } catch (error) {
      console.error("Failed to fetch orders:", error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this order?")) {
      try {
        await axios.delete(`/orders/deleteorder/${id}`);
        fetchOrders(); // Refresh the list after delete
      } catch (error) {
        console.error("Failed to delete order:", error);
      }
    }
  };

  // const handleViewDetails =async (id) => {
  //   // Navigate to the order details page with the order ID
  //   navigate(`/vendor/orders/getorderdetails/${id}`);
  // };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-6 text-gray-800">Manage Orders</h1>

      <div className="overflow-x-auto bg-white rounded-2xl shadow-md">
        <table className="min-w-full table-auto border-collapse">
          <thead>
            <tr className="bg-gray-100 text-gray-700 text-left">
              <th className="px-6 py-4 font-medium">Order ID</th>
              <th className="px-6 py-4 font-medium">Customer</th>
              <th className="px-6 py-4 font-medium">Date</th>
              <th className="px-6 py-4 font-medium">Amount (₹)</th>
              <th className="px-6 py-4 font-medium">Status</th>
              <th className="px-6 py-4 font-medium text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="text-sm text-gray-800">
            {orders.length > 0 ? (
              orders.map((order) => (
                <tr key={order._id} className="border-t">
                  <td className="px-6 py-4">{order._id}</td>
                  <td className="px-6 py-4">{order.userId?.firstName || "Unknown"} {order.userId?.lastName}</td>
                  <td className="px-6 py-4">{new Date(order.createdAt).toLocaleDateString()}</td>
                  <td className="px-6 py-4">₹{order.totalAmount}</td>
                  <td className="px-6 py-4">
                    <StatusBadge status={order.status} />
                  </td>
                  <td className="px-6 py-4 text-center space-x-3">
                    {/* <button 
                      onClick={() => alert(`View order details for ${order._id}`)}
                    className="text-blue-600 hover:text-blue-800" title="View">
                      <FaEye />
                    </button> */}
                    {/* <button
                      onClick={handleViewDetails}
                      className="text-blue-600 hover:text-blue-800"
                      title="View Order Details"
                    >
                      <FaEye className="mr-2" />
                    </button> */}
                    {/* <button className="text-green-600 hover:text-green-800" title="Update Status">
                      <FaEdit />
                    </button> */}
                    <button
                      onClick={() => handleDelete(order._id)}
                      className="text-red-600 hover:text-red-800"
                      title="Delete">
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td className="px-6 py-4" colSpan="6">
                  No orders found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
