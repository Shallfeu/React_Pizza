import React from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const FullPizza: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [pizza, setPizza] = React.useState<{ imageUrl: string; title: string; price: number }>();

  React.useEffect(() => {
    async function fetchPizza() {
      try {
        const { data } = await axios.get(
          `https://6293a6f47aa3e6af1a0ef002.mockapi.io/Pizzas/${id}`,
        );
        setPizza(data);
      } catch (error) {
        alert('Ошибка при получении данных');
        navigate('/');
      }
    }
    fetchPizza();
  }, []);

  if (!pizza) {
    return <>Loading...</>;
  }

  return (
    <div className="container">
      <div className="container-fullpizza">
        <div className="fullpizza-info">
          <img className="img-fullpizza" src={pizza.imageUrl} alt="pizza_picture" />
          <h2>{pizza.title}</h2>
          <h4>{pizza.price} P</h4>
        </div>
        <Link to="/">
          <button className="button button--outline button--add">
            <span>Назад</span>
          </button>
        </Link>
      </div>
    </div>
  );
};

export default FullPizza;
