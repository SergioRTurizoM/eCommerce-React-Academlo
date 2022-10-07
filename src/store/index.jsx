import { configureStore } from '@reduxjs/toolkit'
import purchasesSlice from './slices/purchases.slice' 
import isLoadingSlice from './slices/isLoading.slice'
import newSliceSlice from './slices/newSlice.slice'
import  cartSlice  from './slices/cart.Slice'




export default configureStore({
    reducer: {
        isLoading: isLoadingSlice,
        products: newSliceSlice,
        purchasesSlice: purchasesSlice,
        cartSlice: cartSlice
    }
})
