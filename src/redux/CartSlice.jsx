import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({ //reducer->store
    name: "cart",
    initialState: {
        cart: []
    },
    reducers: {
        //addtocart,removefromcart

        //state --> initialState
        //action-->type=>cart/addtocart, payload=>data of cart
        // addToCart:(state,action) => {
        //    state.cart.push(action.payload);
        //    //push data in cart obj
        // }
        addToCart: (state, action) => {
            state.cart.push(action.payload);
        },

        removeFromCart: (state, action) => {
            //state.cart = state.cart.filter((item) => item.id !== action.payload);
            const index = state.cart.findIndex((item) => item.id === action.payload);
            if (index !== -1) {
                state.cart.splice(index, 1); // remove only the first matching item
            }
        },

        clearCart: (state) => {
            state.cart = [];
        },
    }
})
export const { addToCart, removeFromCart, clearCart } = cartSlice.actions //actions export
export default cartSlice.reducer //reducer export