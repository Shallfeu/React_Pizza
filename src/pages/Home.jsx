import React from 'react';
import { SearchContext } from '../App';
import { useSelector, useDispatch } from 'react-redux';
import { setCategoryId } from '../redux/Slices/filterSlice';

import Categories from '../components/Categories';
import Sort from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';
import Pagination from '../components/Pagination/Pagination';

const Home = () => {
  const categoryId = useSelector((state) => state.filterSlice.categoryId);
  const dispatch = useDispatch();

  const { sortProperty, alpha } = useSelector((state) => state.filterSlice.sort);

  const [items, setItems] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [currentPage, setCurrentPage] = React.useState(1);

  const { searchValue } = React.useContext(SearchContext);
  const search = searchValue ? `&search=${searchValue}` : '';

  React.useEffect(() => {
    setIsLoading(true);
    fetch(
      `https://6293a6f47aa3e6af1a0ef002.mockapi.io/Pizzas?page=${currentPage}&limit=4&${
        categoryId > 0 ? `category=${categoryId}` : ''
      }&sortBy=${sortProperty.replace('-', '')}&order=${alpha}${search}`,
    )
      .then((pizzas) => pizzas.json())
      .then((arr) => {
        setItems(arr);
        setIsLoading(false);
      });
    window.scrollTo(0, 0);
  }, [categoryId, sortProperty, search, currentPage, alpha]);

  const pizzas = items.map((obj) => <PizzaBlock key={obj.id} {...obj} />);
  const skeletons = [...new Array(6)].map((_, index) => <Skeleton key={index} />);

  return (
    <div className="container">
      <div className="content__top">
        <Categories value={categoryId} onClickCategory={(id) => dispatch(setCategoryId(id))} />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">{isLoading ? skeletons : pizzas}</div>
      <Pagination onPageChange={setCurrentPage} />
    </div>
  );
};

export default Home;
