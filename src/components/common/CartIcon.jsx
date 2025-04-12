import React from "react";
import { FaShoppingCart } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export const CartIcon = () => {
  const cartItems = useSelector((state) => state.cart.cart);

  // Group and count quantities
  const itemCount = cartItems.reduce((total, item) => total + 1, 0);

  return (
    <Link to="/cart" className="relative text-blue-900">
      <FaShoppingCart size={24} />
      {itemCount > 0 && (
        <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold rounded-full px-1.5 py-0.5">
          {itemCount}
        </span>
      )}
    </Link>
  );
};




