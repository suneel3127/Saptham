import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userDetails:{},
  cartItems: [],
  stores:[],
  products: [],
  productVariants:[],
  productReviews:[]
};

const slice = createSlice({
  name: "slice",
  initialState,
  reducers: {
    setUser:(state,action)=>{
      state.userDetails=action.payload
    },
    addItemToCart: (state, action) => {
      const itemIndex = state.cartItems.findIndex((item) => item.id === action.payload.id);
      if (itemIndex === -1) {
        state.cartItems.push(action.payload);
      } else {
        state.cartItems[itemIndex] = action.payload;
      }
    },
    removeItemFromCart: (state, action) => {
        state.cartItems = state.cartItems.filter((item) => item.id !== action.payload);
      },
    emptyCart : ( state , action) => {
      console.log("inside redux")
      state.cartItems =[];
    },  
    setStores: (state,action) =>{
      state.stores = action.payload
    },  
    setProducts:(state,action)=>{
      state.products = action.payload;
    },
    setVariants:(state,action)=>{
      state.productVariants = action.payload;
    },
    setReviews:(state,action)=>{
      state.productReviews = action.payload;
    },
  },
});

export const { addItemToCart, removeItemFromCart, setStores, setUser, setProducts, setVariants, setReviews , emptyCart} = slice.actions;

export default slice.reducer;

