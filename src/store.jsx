import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./redux/CartSlice"
import wishlistReducer from "./redux/WishListSlice"

export const store = configureStore({
    reducer:{
        //cart,theme
        cart: cartReducer, //reducerName
        wishlist: wishlistReducer,
    }
})