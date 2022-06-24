import React from 'react';

type CategoriesProps = { value: number; onClickCategory: (index: number) => void };

const Categories: React.FC<CategoriesProps> = React.memo(({ value, onClickCategory }) => {
  const categories: string[] = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];

  return (
    <div className="categories">
      <ul>
        {categories.map((item, index) => (
          <li
            key={index}
            onClick={() => onClickCategory(index)}
            className={value === index ? 'active' : ''}>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
});

export default Categories;
