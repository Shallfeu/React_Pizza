import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { Pizza, SearchPizzaParams } from './types';

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
