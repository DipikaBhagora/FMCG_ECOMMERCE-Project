import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  wishlist: [], // initial state property
};

const WishListSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    addToWishlist: (state, action) => {
        state.wishlist.push(action.payload);
      
    },
    removeFromWishlist: (state, action) => {
      state.wishlist = state.wishlist.filter(item => item._id !== action.payload);
    },
    clearWishlist: (state) => {
      state.wishlist = [];
    },
  },
});

export const { addToWishlist, removeFromWishlist, clearWishlist } = WishListSlice.actions;
export default WishListSlice.reducer;
