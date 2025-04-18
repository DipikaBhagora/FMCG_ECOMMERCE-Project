import React, { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { clearCart } from "../../redux/CartSlice";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

export const PlaceOrder = () => {
  const cartItems = useSelector((state) => state.cart.cart);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const hasPlacedOrder = useRef(false);
  const [loading, setLoading] = useState(false);

  const groupedCart = cartItems.reduce((acc, item) => {
    const key = item.id;
    if (!acc[key]) {
      acc[key] = { ...item, quantity: 1 };
    } else {
      acc[key].quantity += 1;
    }
    return acc;
  }, {});

  const groupedItems = Object.values(groupedCart);
  const totalPrice = groupedItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const userId = localStorage.getItem("id");

  const placeOrder = async () => {
    if (hasPlacedOrder.current) return;
    hasPlacedOrder.current = true;
    setLoading(true);

    try {
      console.log("Sending order request...");
      const res = await axios.post("/orders/addorder", {
        userId,
        items: groupedItems.map((item) => ({
          productId: item.id,
          productName: item.productName,
          price: item.price,
        })),
        totalAmount: totalPrice,
      });

      console.log("Order response:", res.data);

      if (res.data?.success || res.data?.data) {
        toast.success("Order placed successfully!");
        dispatch(clearCart());
        localStorage.removeItem("cart");

        setTimeout(() => {
          navigate("/user/orders");
        }, 2000);
      } else {
        toast.error("Failed to place the order.");
        navigate("/shop");
      }
    } catch (err) {
      console.error("Error placing order:", err);
      toast.error("Something went wrong while placing your order.");
      navigate("/shop");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (groupedItems.length > 0) {
      placeOrder();
    } else {
      toast.info("Your cart is empty.");
      navigate("/shop");
    }
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center p-10 bg-white shadow-xl rounded-lg">
        <h1 className="text-3xl font-semibold text-blue-700 mb-4">
          {loading ? "Placing your order..." : "Order Placed Successfully!"}
        </h1>
        <p className="text-gray-500">
          {loading
            ? "Please wait while we process your request."
            : "Redirecting you to your orders..."}
        </p>
        <div className="mt-4">
          <div className="animate-spin inline-block w-12 h-12 border-4 rounded-full border-t-4 border-blue-600" />
        </div>
      </div>
    </div>
  );
};

