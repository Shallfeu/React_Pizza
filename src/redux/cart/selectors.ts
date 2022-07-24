import { RootState } from '../store';

export const selectCart = (state: RootState) => state.sliceCart;

export const selectCartItemById = (id: string) => (state: RootState) =>
  state.sliceCart.items.find((item) => item.id === id);
