export type Pizza = {
  id: string;
  title: string;
  price: number;
  imageUrl: string;
  sizes: number[];
  types: number[];
  rating: number;
};

export interface PizzaSlice {
  items: Pizza[];
  status: 'loading' | 'success' | 'error';
}

export type SearchPizzaParams = {
  sortBy: string;
  alpha: string;
  category: string;
  currentPage: string;
  search: string;
};

export enum Status {
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error',
}
