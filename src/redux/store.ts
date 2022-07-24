import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import filterSlice from './filter/slice';
import sliceCart from './cart/slice';
import slicePizza from './pizza/slice';

export const store = configureStore({
  reducer: {
    filterSlice,
    sliceCart,
    slicePizza,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
