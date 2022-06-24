import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
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

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>();

