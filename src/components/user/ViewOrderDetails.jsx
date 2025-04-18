import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

export const ViewOrderDetails = () => {
    const navigate = useNavigate();
    const [orderDetails, setOrderDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const { id } = useParams();

    const fetchOrderDetails = async () => {
        try {
            const res = await axios.get(`/orders/getorderdetails/${id}`);
            setOrderDetails(res.data.data);
            console.log("Fetched order details:", res.data);  // Check the response structure
            setLoading(false);
        } catch (err) {
            console.error("Failed to fetch order details", err);
            toast.error("Failed to load order details. Please try again.");
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchOrderDetails();
    }, [id]);

    if (loading) {
        return (
            <div className="min-h-screen flex justify-center items-center">
                <p className="text-gray-600 text-xl">Loading...</p>
            </div>
        );
    }

    if (!orderDetails) {
        return (
            <div className="min-h-screen flex justify-center items-center">
                <p className="text-red-600 text-xl">Order not found!</p>
            </div>
        );
    }

    const { _id, userId, items, totalAmount, status, paymentStatus, createdAt } = orderDetails;

    // Helper for badge color
    const getStatusBadge = (status) => {
        switch (status?.toLowerCase()) {
            case "paid":
            case "completed":
                return "bg-green-100 text-green-700";
            case "pending":
                return "bg-yellow-100 text-yellow-700";
            case "cancelled":
                return "bg-red-100 text-red-700";
            default:
                return "bg-gray-100 text-gray-700";
        }
    };

    return (
        <section className="min-h-screen bg-gray-100 py-10 px-4">
            <div className="max-w-4xl mx-auto bg-white p-8 rounded-2xl shadow-2xl">
                {/* <button
          onClick={() => navigate(-1)}
          className="mb-6 text-blue-600 hover:underline text-2xl flex items-center"
        >
          ←
        </button> */}

                <h1 className="text-3xl font-bold text-blue-900 mb-6">Order Summary</h1>

                {/* Order Basic Info */}
                <div className="space-y-2 mb-8">
                    <p className="text-gray-700"><strong>Order ID:</strong> {_id}</p>
                    <p className="text-gray-700"><strong>Order Date:</strong> {new Date(createdAt).toLocaleDateString()}</p>
                    <div className="flex gap-4">
                        <p className="flex items-center gap-2">
                            <strong>Status:</strong>
                            <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusBadge(status)}`}>
                                {status}
                            </span>
                        </p>
                        <p className="flex items-center gap-2">
                            <strong>Payment:</strong>
                            <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusBadge(paymentStatus)}`}>
                                {paymentStatus}
                            </span>
                        </p>
                    </div>
                </div>

                {/* Divider */}
                <hr className="my-8" />

                {/* Customer Info */}
                <div className="bg-gray-50 p-6 rounded-lg mb-8 shadow-sm">
                    <h2 className="text-xl font-semibold text-gray-800 mb-4">Customer Information</h2>
                    <div className="space-y-2 text-gray-700">
                        <p><strong>Name:</strong> {userId?.firstName} {userId?.lastName}</p>
                        <p><strong>Email:</strong> {userId?.email}</p>
                        <p><strong>Phone:</strong> {userId?.number}</p>
                    </div>
                </div>

                {/* Items */}
                <div>
                    <h2 className="text-xl font-semibold text-gray-800 mb-4">Ordered Items</h2>
                    {items && items.length > 0 ? (
                        <ul className="space-y-4">
                            {items.map((item, index) => (
                                <li
                                    key={index}
                                    className="flex justify-between items-center bg-gray-50 p-4 rounded-lg shadow-sm"
                                >
                                    <div>
                                        <p className="font-medium">{item.productId?.productName || "Unnamed Product"}</p>
                                    </div>
                                    <p className="text-sm text-gray-600">
                                        Price: ₹{item.productId?.offerPrice}
                                    </p>
                                    <p className="text-sm text-gray-600">
                                        Quantity: {item.productId?.quantity}
                                    </p>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-gray-600">No items found.</p>
                    )}
                </div>

                {/* Total */}
                <div className="text-right mt-10">
                    <h3 className="text-2xl font-bold text-blue-800">
                        Total Amount: ₹{totalAmount}
                    </h3>
                </div>
            </div>
        </section>
    );
};
