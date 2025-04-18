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
      console.log("Fetched Orders:", res.data.data);

      // Filter user-specific orders (with safe checking)
      const userOrders = res.data.data.filter(
        (order) => order?.userId?._id === userId
      );
      console.log("Filtered User Orders:", userOrders);

      // Group items by product ID and calculate total quantity
      const groupedOrders = userOrders.map((order) => {
       
        const groupedItems = order.items.reduce((acc, item) => {
          const key = item.productId?._id || item.productId; // handle if populated or just ID
          if (!acc[key]) {
            acc[key] = { ...item, quantity: 1, price: item.productId?.offerPrice || item.productId?.price || item.price || 0 // use offerPrice if available
 };
          } else {
            acc[key].quantity += 1; // Increment quantity if same product
          }
          return acc;
        }, {});

        const totalQuantity = Object.values(groupedItems).reduce((total, item) => total + item.quantity, 0);

        return { ...order, groupedItems: Object.values(groupedItems), totalQuantity };
      });

      setOrders(groupedOrders);
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
      const res = await axios.post("/orders/createrazorpayorder", { amount });

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: res.data.amount,
        currency: "INR",
        name: "Your Store",
        description: "Order Payment",
        order_id: res.data.orderId,
        handler: async (response) => {
          console.log("✅ Payment Success", response);
          alert("Payment successful!");

          try {
            await axios.patch("/orders/updatepayment", {
              orderId,
              paymentStatus: "Paid",
              paymentId: response.razorpay_payment_id,
            });
            toast.success("Payment successful!");
            fetchOrders(); // Refresh
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
          color: "#3399cc",
        },
        modal: {
          ondismiss: function () {
            alert("Payment process was cancelled");
          },
        },
      };

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
            <p className="text-gray-500 text-lg mb-6">
              You haven’t placed any orders yet.
            </p>
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
                      className={`text-sm font-medium px-3 py-1 rounded-full block ${
                        statusColors[order.status] || "bg-gray-100 text-gray-800"
                      }`}
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
                  {order.groupedItems?.map((item, index) => {
                    const productName =
                      item?.productId?.productName || "Unnamed Product";
                    const price = item?.productId?.price;
                    const quantity = item?.quantity || 1;

                    return (
                      <div
                        key={index}
                        className="flex justify-between items-center py-1 text-sm"
                      >
                        <span>{productName}</span>
                        <div className="text-right">
                          <span className="text-gray-500">Qty: {quantity}</span>
                        </div>
                      </div>
                    );
                  })}
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
                      onClick={() => navigate(`/user/orderdetails/${order._id}`)}
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


