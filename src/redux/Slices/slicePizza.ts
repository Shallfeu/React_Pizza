import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '../store';

type Pizza = {
  id: string;
  title: string;
  price: number;
  imageUrl: string;
  sizes: number[];
  types: number[];
  rating: number;
};

interface PizzaSlice {
  items: Pizza[];
  status: 'loading' | 'success' | 'error';
}

enum Status {
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error',
}

const initialState: PizzaSlice = {
  items: [],
  status: Status.LOADING, // loading | success | error
};

export type SearchPizzaParams = {
  sortBy: string;
  alpha: string;
  category: string;
  currentPage: string;
  search: string;
};

export const fetchPizza = createAsyncThunk<Pizza[], SearchPizzaParams>(
  'pizza/FetchPizzaStatus',

  async (params) => {
    const { sortBy, alpha, category, currentPage, search } = params;

    const { data } = await axios.get<Pizza[]>(
      `https://6293a6f47aa3e6af1a0ef002.mockapi.io/Pizzas?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${alpha}${search}`,
    );

    return data;
  },
);

const slicePizza = createSlice({
  name: 'pizza',
  initialState,
  reducers: {
    setItems(state, action: PayloadAction<Pizza[]>) {
      state.items = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPizza.pending, (state, action) => {
      state.status = Status.LOADING;
      state.items = [];
    });

    builder.addCase(fetchPizza.fulfilled, (state, action) => {
      state.status = Status.SUCCESS;
      state.items = action.payload;
    });

    builder.addCase(fetchPizza.rejected, (state, action) => {
      state.status = Status.ERROR;
      state.items = [];
    });
  },
});

export const selectCart = (state: RootState) => state.slicePizza;

export const { setItems } = slicePizza.actions;

export default slicePizza.reducer;
