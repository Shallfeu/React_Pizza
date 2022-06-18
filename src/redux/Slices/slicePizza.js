import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  items: [],
  status: 'loading', // loading | success | error
};

export const fetchPizza = createAsyncThunk(
  'pizza/FetchPizzaStatus',

  async (params) => {
    const { sortBy, alpha, category, currentPage, search } = params;

    const { data } = await axios.get(
      `https://6293a6f47aa3e6af1a0ef002.mockapi.io/Pizzas?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${alpha}${search}`,
    );

    return data;
  },
);

const slicePizza = createSlice({
  name: 'pizza',
  initialState,
  reducers: {
    setItems(state, action) {
      state.items = action.payload;
    },
  },
  extraReducers: {
    [fetchPizza.fulfilled]: (state, action) => {
      state.items = action.payload;
      state.status = 'succcess';
    },
    [fetchPizza.pending]: (state, action) => {
      state.items = [];
      state.status = 'loading';
    },
    [fetchPizza.rejected]: (state, action) => {
      state.items = [];
      state.status = 'error';
    },
  },
});

export const selectCart = (state) => state.slicePizza;

export const { setItems } = slicePizza.actions;

export default slicePizza.reducer;
