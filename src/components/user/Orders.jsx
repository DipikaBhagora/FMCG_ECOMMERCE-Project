import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const statusColors = {
  Pending: "bg-yellow-100 text-yellow-800",
  Done: "bg-blue-100 text-blue-800",
  Shipped: "bg-indigo-100 text-indigo-800",
  Delivered: "bg-green-100 text-green-800",
  Cancelled: "bg-red-100 text-red-800",
};

const loadRazorpayScript = () => {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

export const Orders = () => {
  const [orders, setOrders] = useState([]);
  const userId = localStorage.getItem("id");
  const navigate = useNavigate();

  const fetchOrders = async () => {
    try {
      const res = await axios.get("/orders/getorders");
      const userOrders = res.data.data.filter((order) => order.userId._id === userId);
      setOrders(userOrders);
    } catch (err) {
      console.error("Error fetching orders", err);
      toast.error("Failed to fetch orders. Please try again later.");
    }
  };

  const handlePayment = async (orderId, amount) => {
    const isScriptLoaded = await loadRazorpayScript();

    if (!isScriptLoaded) {
      toast.error("Failed to load Razorpay SDK. Please try again.");
      return;
    }

    try {
      // Step 1: Create Razorpay Order
      const res = await axios.post("/orders/createrazorpayorder", { amount });

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID, // Use env variable in Vite
        amount: res.data.amount, // Amount in paise
        currency: "INR",
        name: "Your Store",
        description: "Order Payment",
        order_id: res.data.orderId,
        handler: async (response) => {
          console.log("✅ Payment Success", response);
          alert("Payment successful!");

          // Step 2: Update payment status to "Paid" after successful payment
          try {
            await axios.patch("/orders/updatepayment", {
              orderId,
              paymentStatus: "Paid",
              paymentId: response.razorpay_payment_id,
            });
            toast.success("Payment successful!");
            fetchOrders(); // Refresh the orders list
          } catch (err) {
            console.error("❌ Failed to update payment status", err);
            toast.error("Failed to update payment status.");
          }
        },
        prefill: {
          name: "Customer Name",
          email: "customer@example.com",
          contact: "9999999999",
        },
        theme: {
          color: "#3399cc", // Customize theme color
        },
        modal: {
          ondismiss: function () {
            alert("Payment process was cancelled");
          },
        },
      };

      // Step 3: Open Razorpay Checkout
      const rzp = new window.Razorpay(options);

      rzp.on("payment.failed", function (response) {
        console.error("❌ Payment Failed", response);
        alert("Payment failed. Please try again.");
      });

      console.log("🟡 Opening Razorpay Checkout...");
      rzp.open();

    } catch (err) {
      console.error("❌ Error creating Razorpay order", err);
      toast.error("Error initiating payment. Please try again.");
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <section className="min-h-screen bg-gray-50 py-10 px-4">
    <div className="max-w-5xl mx-auto bg-white rounded-xl shadow-lg p-8">
      <h1 className="text-3xl font-semibold text-blue-900 mb-8">Your Orders</h1>

      {orders.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-gray-500 text-lg mb-6">You haven’t placed any orders yet.</p>
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div
              key={order._id}
              className="border rounded-lg p-6 bg-gray-50 shadow-sm hover:shadow-md transition"
            >
              <div className="flex justify-between items-center mb-4">
                <div>
                  <h2 className="text-lg font-semibold text-gray-800">
                    Order ID: <span className="text-blue-700">{order._id}</span>
                  </h2>
                  <p className="text-sm text-gray-500">
                    Date: {new Date(order.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <div className="text-right">
                  <span
                    className={`text-sm font-medium px-3 py-1 rounded-full block ${statusColors[order.status]}`}
                  >
                    {order.status}
                  </span>
                  <span className="text-xs text-gray-600 mt-1 block">
                    Payment: {order.paymentStatus || "Pending"}
                  </span>
                </div>
              </div>

              <div className="border-t pt-4">
                <p className="text-gray-600 mb-2 font-medium">Items:</p>
                {order.items?.length > 0 ? (
                  order.items.map((item, index) => (
                    <div key={index} className="flex justify-between items-center py-1 text-sm">
                      <span>{item.productName || "Item"}</span>
                      <span>Qty: {item.quantity}</span>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-400 italic text-sm">No item info available</p>
                )}
                <p className="text-right mt-3 font-semibold text-blue-800">
                  Total: ₹{order.totalAmount}
                </p>
              </div>

              {order.paymentStatus !== "Paid" && (
                <div className="text-right mt-4">
                  <button
                    onClick={() => handlePayment(order._id, order.totalAmount)}
                    className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-md text-sm"
                  >
                    Pay Now
                  </button>
                </div>
              )}

              {order.paymentStatus === "Paid" && (
                <div className="text-right mt-4">
                  <button
                    onClick={() => navigate(`/user/order/${order._id}`)}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-md text-sm"
                  >
                    View Order Details
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  </section>
  );
};

