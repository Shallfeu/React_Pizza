import React from 'react';
import cartEmpty from '../assets/img/empty-cart.png';
import { Link } from 'react-router-dom';
import Cart from '../pages/Cart';

const CartEmpty: React.FC = () => (
  <div className="container">
    <div className="cart cart--empty">
      <h2>Корзина пустая 😕</h2>
      <p>
        Вероятней всего, вы не заказывали ещё пиццу.
        <br />
        Для того, чтобы заказать пиццу, перейди на главную страницу.
      </p>
      <img className="cart-empty" src={cartEmpty} alt="Empty cart" />
      <Link to="/" className="button button--black">
        <span>Вернуться назад</span>
      </Link>
    </div>
  </div>
);

export default CartEmpty;
