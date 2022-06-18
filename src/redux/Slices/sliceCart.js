import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  totalPrice: 0,
  items: [],
};

const sliceCart = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem(state, action) {
      const findItem = state.items.find((item) => item.id === action.payload.id);
      if (findItem) {
        findItem.count += 1;
      } else {
        state.items.push({ ...action.payload, count: 1 });
      }
      state.totalPrice = state.items.reduce((sum, obj) => sum + obj.price * obj.count, 0);
    },

    minusItem(state, action) {
      const findItem = state.items.find((item) => item.id === action.payload.id);
      if (findItem) {
        findItem.count -= 1;
      }
      state.totalPrice = state.items.reduce((sum, obj) => sum + obj.price * obj.count, 0);
    },

    removeItem(state, action) {
      state.items = state.items.filter((obj) => obj.id !== action.payload.id);
      state.totalPrice = state.items.reduce((sum, obj) => sum + obj.price * obj.count, 0);
    },

    clearItems(state) {
      state.items = [];
      state.totalPrice = 0;
    },
  },
});

export const selectCart = (state) => state.sliceCart;
export const selectCartItemById = (id) => (state) =>
  state.sliceCart.items.find((item) => item.id === id);

export const { addItem, clearItems, removeItem, minusItem } = sliceCart.actions;

export default sliceCart.reducer;
