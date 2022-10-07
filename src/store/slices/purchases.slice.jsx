import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import getConfig from "../../utils/getConfig";
import { getCart, getCartThunk } from "./cart.Slice";
import { setIsLoading } from "./isLoading.slice";

export const purchasesSlice = createSlice({
  name: "purchases",
  initialState: [],
  reducers: {
    setPurchases: (state, action) => {
      return action.payload;
    },
  },
});

export const getPurchasesThunk = () => (dispatch) => {
  dispatch(setIsLoading(true));
  return axios
    .get(
      "https://ecommerce-api-react.herokuapp.com/api/v1/purchases",
      getConfig()
    )
    .then((res) => dispatch(setPurchases(res.data)))
    .finally(() => dispatch(setIsLoading(false)));
};


export const addFavoriteThunk = (favorite) => (dispatch)=> {
  dispatch(setIsLoading(true));
  console.log("Me ejecute")
  return axios.post('https://ecommerce-api-react.herokuapp.com/api/v1/cart', favorite,
  getConfig()
  )
  .then(()=> dispatch(getCartThunk()))
  .finally(()=> dispatch(setIsLoading(false)))
}

export const checkoutButtonThunk = ()=>(dispatch)=>{
  dispatch(setIsLoading(true));
  return axios.post('https://ecommerce-api-react.herokuapp.com/api/v1/purchases',{}, getConfig())
  .then(()=>dispatch(getCart([])))
  .finally(()=> dispatch(setIsLoading(false)))
}

export const { setPurchases } = purchasesSlice.actions;

export default purchasesSlice.reducer;
