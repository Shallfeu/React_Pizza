import { configureStore } from '@reduxjs/toolkit';
import filterSlice from './Slices/filterSlice';
import sliceCart from './Slices/sliceCart';

export const store = configureStore({
  reducer: {
    filterSlice,
    sliceCart,
  },
});
