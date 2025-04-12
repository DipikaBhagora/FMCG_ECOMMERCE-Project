import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { clearCart, removeFromCart } from "../../redux/CartSlice";

export const Cart = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cart);

  // Group by product ID and count quantity
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

  // Calculate total price
  const totalPrice = groupedItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

   //Save cart to localStorage whenever cartItems change
   useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  //Clear cart from Redux and localStorage
  const handleClearCart = () => {
    dispatch(clearCart());
    localStorage.removeItem("cart");
  };

  return (
    <section className="min-h-screen bg-blue-50 py-10 px-4">
      <div className="max-w-5xl mx-auto bg-white rounded-xl shadow-lg p-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-semibold text-blue-900">
            <Link to="/">
            Shopping Cart
            </Link>
            </h1>
          {groupedItems.length > 0 && (
            <button
              // onClick={() => 
              //   dispatch(clearCart())
              // }
              onClick={handleClearCart}
              className="bg-red-500 hover:bg-red-600 text-white text-sm font-medium px-4 py-2 rounded-md transition"
            >
              Clear Cart
            </button>
          )}
        </div>

        {groupedItems.length > 0 ? (
          <>
            {/* Cart Items */}
            <div className="divide-y">
              {groupedItems.map((item) => (
                <div key={item.id} className="py-6 flex justify-between items-center">
                  <div className="flex items-center gap-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-20 h-20 rounded-lg border object-cover"
                    />
                    <div>
                      <h2 className="text-lg font-medium">{item.name}</h2>
                      <p className="text-gray-500 text-sm">₹{item.price.toFixed(2)}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm">Qty: {item.quantity}</p>
                    <p className="font-semibold mt-1">
                      ₹{(item.price * item.quantity).toFixed(2)}
                    </p>
                    <button
                      onClick={() => dispatch(removeFromCart(item.id))}
                      className="text-red-500 text-sm mt-1 hover:underline"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Summary & Actions */}
            <div className="flex justify-between items-center mt-10 border-t-4 pt-6">
              <button
                onClick={() => alert("Proceeding to checkout...")}
                className="bg-green-600 hover:bg-green-700 text-white font-medium px-6 py-3 rounded-md transition"
              >
                Buy Now
              </button>
              <p className="text-xl font-semibold text-blue-900">
                Grand Total: ₹{totalPrice.toFixed(2)}
              </p>
            </div>
          </>
        ) : (
          // Empty Cart View
          <div className="text-center py-20">
            <p className="text-gray-500 text-lg mb-6">Your cart is currently empty.</p>
            <Link
              to="/"
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md font-medium transition"
            >
              Continue Shopping
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};


