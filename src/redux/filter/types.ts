export enum SortPropertyEnum {
  RATING = 'rating',
  PRICE_ASC = '-price',
  PRICE_DESC = 'price',
  TITLE = 'title',
}

export enum SortAlphaEnum {
  DESC = 'desc',
  ASC = 'asc',
}

export type Sort = {
  name: string;
  sortProperty: SortPropertyEnum;
  alpha: SortAlphaEnum;
};

export interface FilterSlicaState {
  searchValue: string;
  categoryId: number;
  currentPage: number;
  sort: Sort;
}
