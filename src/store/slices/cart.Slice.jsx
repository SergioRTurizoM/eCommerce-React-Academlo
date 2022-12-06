import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import getConfig from "../../utils/getConfig";
import { setIsLoading } from "./isLoading.slice";
import { getPurchasesThunk } from "./purchases.slice";

export const cartSlice = createSlice({
  name: "cart",
  initialState: [],
  reducers: {
    getCart: (state, action) => {
      return action.payload;
      
    },
  },
});

export const getCartThunk = () => (dispatch) => {
  dispatch(setIsLoading(true));
  return axios
    .get("https://e-commerce-api.academlo.tech/api/v1/cart", getConfig())
    .then((res) => dispatch(getCart(res.data)))
    .finally(() => dispatch(setIsLoading(false)));
};

export const deleteProductThunk =(id)=>(dispatch)=>{
  dispatch(setIsLoading(true));
  axios.delete(`https://e-commerce-api.academlo.tech/api/v1/cart/${id}`, getConfig())
  .then(()=> dispatch(getCartThunk()))
  .catch((error) =>
    console.log("Hubo un error con la eliminación del producto")
  )
  .finally( dispatch(setIsLoading(false)))
}

export const { getCart } = cartSlice.actions;

export default cartSlice.reducer;
