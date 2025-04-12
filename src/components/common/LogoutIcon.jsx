import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { clearCart } from "../../redux/CartSlice";
import { clearWishlist } from "../../redux/WishListSlice";

export const LogoutIcon = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    // Clear Redux states
    dispatch(clearCart());
    dispatch(clearWishlist());

    // Clear localStorage items
    localStorage.removeItem("id");
    localStorage.removeItem("role");
    localStorage.removeItem("cart");
    localStorage.removeItem("wishlist");

    // Clear session storage if used
    sessionStorage.clear();

    // Redirect to login
    window.location.href = "/login";
  }, [dispatch]);

  return null; // Nothing to render
};

