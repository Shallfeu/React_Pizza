import Loadable from 'react-loadable';
import React, { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import MainLayout from './layouts/MainLayout';

import './scss/app.scss';

const Cart = Loadable({
  loader: () => import(/* webpackChunkName: "Cart" */ './pages/Cart'),
  loading: () => <div>Loading ...</div>,
});

const NotFound = React.lazy(() => import(/* webpackChunkName: "NotFound" */ './pages/NotFound'));
const FullPizza = React.lazy(() => import(/* webpackChunkName: "FullPizza" */ './pages/FullPizza'));

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route path="" element={<Home />}></Route>
        <Route
          path="cart"
          element={
            <Suspense fallback={<div>Loading ...</div>}>
              <Cart />
            </Suspense>
          }></Route>
        <Route
          path="pizza/:id"
          element={
            <Suspense fallback={<div>Loading ...</div>}>
              <FullPizza />
            </Suspense>
          }></Route>
        <Route
          path="*"
          element={
            <Suspense fallback={<div>Loading ...</div>}>
              <NotFound />
            </Suspense>
          }></Route>
      </Route>
    </Routes>
  );
}

export default App;
