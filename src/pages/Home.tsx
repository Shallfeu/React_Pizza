import React, { useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import qs from 'qs';

import { Categories, Sort, PizzaBlock, Skeleton, Pagination } from '../components';
import { list } from '../components/Sort';

import { fetchPizza } from '../redux/pizza/asyncActions';
import { setCategoryId, setCurrentPage, setFilters } from '../redux/filter/slice';
import { useAppDispatch } from '../redux/store';
import { selectSearch, selectSort } from '../redux/filter/selectors';
import { selectCart } from '../redux/pizza/selectors';
import { SearchPizzaParams } from '../redux/pizza/types';

const Home: React.FC = () => {
  const isSearch = React.useRef(false);
  const isMounted = React.useRef(false);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { sort, currentPage, categoryId } = useSelector(selectSort);
  const { items, status } = useSelector(selectCart);
  const searchValue = useSelector(selectSearch);
  const search = searchValue ? `&search=${searchValue}` : '';
  const { sortProperty, alpha } = sort;
  const category = categoryId > 0 ? `category=${categoryId}` : '';
  const sortBy = sortProperty.replace('-', '');

  const onChangePage = (number: number) => dispatch(setCurrentPage(number));
  const onChangeCategory = useCallback((id: number) => dispatch(setCategoryId(id)), []);

  const getPizzas = () => {
    dispatch(
      fetchPizza({
        sortBy,
        alpha,
        category,
        currentPage: String(currentPage),
        search,
      }),
    );
    window.scrollTo(0, 0);
  };

  //Если был первый рендер, то проверяем url params и сохраняем в redux
  React.useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1)) as unknown as SearchPizzaParams;
      const sort = list.find((obj) => obj.sortProperty === params.sortBy);
      if (sort) {
        dispatch(
          setFilters({
            searchValue: params.search,
            categoryId: Number(params.category),
            currentPage: Number(params.currentPage),
            sort,
          }),
        );
      }
      isSearch.current = true;
    }
  }, []);

  //Если был первый рендер, то совершаем запрос
  React.useEffect(() => {
    window.scrollTo(0, 0);
    if (!isSearch.current) {
      getPizzas();
    }
    isSearch.current = false;
  }, [categoryId, sortProperty, search, currentPage]);

  React.useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        sortProperty: sort.sortProperty,
        categoryId,
        currentPage,
      });
      navigate(`?${queryString}`);
    }
    isMounted.current = true;
  }, [categoryId, sort.sortProperty, currentPage]);

  const pizzas = items.map((obj: any) => <PizzaBlock key={obj.id} {...obj} />);

  const skeletons = [...new Array(6)].map((_, index) => <Skeleton key={index} />);

  return (
    <div className="container">
      <div className="content__top">
        <Categories value={categoryId} onClickCategory={onChangeCategory} />
        <Sort value={sort} />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      {status === 'error' ? (
        <div className="content__error-info">
          <h2>
            Произошла ошибка <span>😕</span>
          </h2>
          <p>
            К сожалению, пиццы потерялись( <br />
            Сейчас попытаемся найти!
          </p>
        </div>
      ) : (
        <div className="content__items">{status === 'loading' ? skeletons : pizzas}</div>
      )}
      <Pagination currentPage={currentPage} onPageChange={onChangePage} />
    </div>
  );
};

export default Home;
