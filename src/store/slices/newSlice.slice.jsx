import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import isLoadingSlice, { setIsLoading } from './isLoading.slice';


export const newSlice = createSlice({
    name: 'products',
    initialState: [],
    reducers: {
        setNews: (state, action) => {
            const products = action.payload;
            return products;
          }

    }
});

export const getNewsThunk = () => (dispatch) => {
    dispatch(setIsLoading(true));
    axios
      .get("https://ecommerce-api-react.herokuapp.com/api/v1/products/")
      .then((res) => dispatch(setNews(res.data)))
      .catch(error=>console.log(error))
      .finally(() => dispatch(setIsLoading(false)));
  };

export const { setNews  } = newSlice.actions;

export default newSlice.reducer;
