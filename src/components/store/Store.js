import {configureStore} from '@reduxjs/toolkit';
import CartReducer from '../feature/CartSlice'


const Store = configureStore({
  reducer:{
    cart:CartReducer
  },
})

export default Store;