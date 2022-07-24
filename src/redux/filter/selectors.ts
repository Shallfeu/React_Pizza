import { RootState } from '../store';

export const selectSort = (state: RootState) => state.filterSlice;
export const selectSearch = (state: RootState) => state.filterSlice.searchValue;
export const selectSortBy = (state: RootState) => state.filterSlice.sort;
