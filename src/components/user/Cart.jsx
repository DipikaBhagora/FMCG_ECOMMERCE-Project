// 
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const userId = localStorage.getItem("id"); // Get user ID from local storage

  useEffect(() => {
    if (userId) {
      fetchCart();
    }
  }, [userId]);

  // Fetch cart items
  const fetchCart = async () => {
    try {
      const res = await axios.get(`/cart/getcart/${userId}`);
      setCartItems(res.data.data);
    } catch (error) {
      console.error("Error fetching cart:", error);
    }
  };

  // Update cart quantity
  const updateCart = async (cartItemId, quantity) => {
    if (quantity < 1) return;
    try {
      await axios.put(`/cart/updatecart/${cartItemId}`, { quantity });
      fetchCart();
    } catch (error) {
      console.error("Error updating cart:", error);
    }
  };

  // Delete cart item
  const deleteCartItem = async (cartItemId) => {
    try {
      await axios.delete(`/cart/deletecart/${cartItemId}`);
      fetchCart();
    } catch (error) {
      console.error("Error deleting cart item:", error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 shadow-lg rounded-lg w-full max-w-4xl">
        <h1 className="text-3xl font-bold text-center text-green-600 mb-6">My Cart</h1>

        {cartItems.length > 0 ? (
          <div className="space-y-6">
            {cartItems.map((item) => (
              <div key={item._id} className="flex justify-between items-center border-b py-4">
                <div className="flex items-center gap-4">
                  <img
                    src={item.productId?.productImages?.[0]}
                    alt={item.productId?.productName}
                    className="w-20 h-20 object-cover rounded-lg"
                  />
                  <div>
                    <h2 className="text-lg font-bold">{item.productId?.productName}</h2>
                    <p className="text-gray-600">₹{item.productId?.offerPrice || item.productId?.basePrice}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <button onClick={() => updateCart(item._id, item.quantity - 1)} className="px-3 py-2 bg-gray-300 text-gray-700 rounded">-</button>
                  <span className="text-lg">{item.quantity}</span>
                  <button onClick={() => updateCart(item._id, item.quantity + 1)} className="px-3 py-2 bg-green-600 text-white rounded">+</button>
                  <button onClick={() => deleteCartItem(item._id)} className="px-3 py-2 bg-red-600 text-white rounded">Remove</button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center text-center py-20">
            <p className="text-gray-500 text-lg">Your cart is empty.</p>
            <Link to="/" className="mt-6 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700">
              Shop Now
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
