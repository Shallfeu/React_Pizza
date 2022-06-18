import { configureStore } from '@reduxjs/toolkit';
import filterSlice from './Slices/filterSlice';
import sliceCart from './Slices/sliceCart';
import slicePizza from './Slices/slicePizza';

export const store = configureStore({
  reducer: {
    filterSlice,
    sliceCart,
    slicePizza,
  },
});
