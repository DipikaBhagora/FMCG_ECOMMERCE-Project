import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { removeFromWishlist, clearWishlist } from "../../redux/WishListSlice";
import { FaHeart, FaTrash } from "react-icons/fa";

export const WishList = () => {
  const dispatch = useDispatch();
  const wishlistItems = useSelector((state) => state.wishlist.wishlist);

  console.log("Wishlist items:", wishlistItems);

  //add data in local storage
  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishlistItems));
  }, [wishlistItems]);

  return (
    <section className="min-h-screen bg-blue-50 py-10 px-4">
      <div className="max-w-5xl mx-auto bg-white rounded-xl shadow-lg p-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-semibold text-pink-700 flex items-center gap-2">
            <FaHeart /> My Wishlist
          </h1>
          {wishlistItems.length > 0 && (
            <button
              onClick={() => dispatch(clearWishlist())}
              className="bg-red-500 hover:bg-red-600 text-white text-sm font-medium px-4 py-2 rounded-md transition"
            >
              Clear All
            </button>
          )}
        </div>

        {wishlistItems.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {wishlistItems.map((item) => (
              <div
                key={item._id}
                className="bg-white rounded-lg shadow-md p-4 text-center flex flex-col items-center justify-between border"
              >
                <Link to={`/product/getproductbyid/${item._id}`} className="block w-full">
                  <img
                    src={
                      Array.isArray(item.productImages)
                      ? item.productImages[0]
                      : typeof item.productImages === "string"
                      ? item.productImages
                      : "https://via.placeholder.com/250"
                  }
                  alt={item.productName}
                  className="w-full h-40 object-cover rounded mb-4"
                  />
                  <h3 className="text-lg font-semibold text-gray-800">{item.productName}</h3>
                  <p className="text-pink-600 font-bold mt-1">
                    ₹{item.offerPrice || item.basePrice}
                  </p>
                </Link>
                <button
                  onClick={() => dispatch(removeFromWishlist(item._id))}
                  className="mt-4 text-red-600 hover:text-red-800 flex items-center gap-1 text-sm"
                >
                  <FaTrash /> Remove
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-gray-500 text-lg mb-6">Your wishlist is empty.</p>
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

