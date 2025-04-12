import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToWishlist, removeFromWishlist } from "../../redux/WishListSlice";
import { FaHeart, FaRegHeart } from "react-icons/fa";

export const FavouriteIcon = ({ product }) => {
  const dispatch = useDispatch();

  // Safely access wishlist from Redux state
  const wishlist = useSelector((state) => state.wishlist?.wishlist || []);

  const isWishlisted = wishlist.some((item) => item._id === product._id);

  const toggleWishlist = () => {
    if (isWishlisted) {
      dispatch(removeFromWishlist(product._id));
    } else {
      dispatch(addToWishlist(product));
    }
  };

  return (
    <button onClick={toggleWishlist} className="absolute top-2 right-2">
      {isWishlisted ? (
        <FaHeart className="text-red-500 text-xl" />
      ) : (
        <FaRegHeart className="text-blue-500 text-xl" />
      )}
    </button>
  );
};




// import React from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { addToWishlist, removeFromWishlist } from "../../redux/WishListSlice";
// import { FaHeart, FaRegHeart } from "react-icons/fa";

// export const FavouriteIcon = ({ product }) => {
//   const dispatch = useDispatch();
//   const wishlist = useSelector((state) => state.wishlist.wishlist);
//   const isWishlisted = wishlist?.some((item) => item.id === product.id);

//   const toggleWishlist = () => {
//     if (isWishlisted) {
//       dispatch(removeFromWishlist(product.id));
//     } else {
//       dispatch(addToWishlist(product));
//     }
//   };

//   return (
//     <div className="cursor-pointer text-red-500" onClick={toggleWishlist}>
//       {isWishlisted ? <FaHeart size={20} /> : <FaRegHeart size={20} />}
//     </div>
//   );
// };
